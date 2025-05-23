require("dotenv").config();
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_API_URL,
  })
);
const PORT = process.env.PORT;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PDF_FILE = "./data/document.pdf";

const embeddedChunks = [];

function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

async function embedText(text) {
  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${GEMINI_API_KEY}`,
    { content: { parts: [{ text }] } }
  );
  return res.data.embedding.values;
}

async function extractTextFromPDF(pdfPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const pdf = await pdfParse(dataBuffer);
  return pdf.text;
}

async function prepareEmbeddings() {
  const text = await extractTextFromPDF(PDF_FILE);
  const chunks = text.match(/(.|[\r\n]){1,300}/g) || [];

  for (const chunk of chunks) {
    const vector = await embedText(chunk);
    embeddedChunks.push({ chunk, vector });
  }

  console.log("PDF embeddings ready.");
}

app.post("/chat", async (req, res) => {
  const { message, previous } = req.body;

  try {
    const queryVector = await embedText(message);
    const scoredChunks = embeddedChunks.map(({ chunk, vector }) => ({
      chunk,
      score: cosineSimilarity(queryVector, vector),
    }));

    const topMatches = scoredChunks
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const highestScore = topMatches[0]?.score || 0;
    const similarityThreshold = 0.8;

    const isRelatedToPDF = highestScore >= similarityThreshold;

    const context = isRelatedToPDF
      ? topMatches.map((m) => m.chunk).join("\n")
      : "";

    const finalContext = previous ? `Previous: ${previous}\n${context}` : context;

    const pdfPromptTemplate = process.env.PDF_PROMPT;
    const generalPromptTemplate = process.env.GENERAL_PROMPT;

    function fillTemplate(template, variables) {
      return template.replace(/\{(\w+)\}/g, (_, key) => variables[key] || "");
    }

    const prompt = isRelatedToPDF
      ? fillTemplate(pdfPromptTemplate, {
          context: finalContext,
          previous: previous || "N/A",
          question: message,
        })
      : fillTemplate(generalPromptTemplate, {
          previous: previous || "N/A",
          question: message,
        });

    const resGemini = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );

    const reply =
      resGemini.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm not sure, but I’ll try to help anyway.";

    res.json({ reply });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to respond." });
  }
});


(async () => {
  await prepareEmbeddings();
  app.listen(PORT, () =>
    console.log(`PDF RAG chatbot running at http://localhost:${PORT}`)
  );
})();
