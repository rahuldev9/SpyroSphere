import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import Loader from "./Loader";
import { BsRobot } from "react-icons/bs";

const Chatbot = ({ closeChat }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [message]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const welcome = {
      text: "Hello, I'm SpyroSphere. How can I help you today?",
      sender: "bot",
      time: new Date(),
    };
    setMessages([welcome]);
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { text: message, sender: "user", time: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    const previousBotMessage = [...messages]
      .reverse()
      .find((m) => m.sender === "bot");

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/chat`, {
        message,
        previous: previousBotMessage?.text || "",
      });
      animateBotMessage(res.data.reply);
      setLoading(false);
    } catch (err) {
      animateBotMessage("Oops! Something went wrong.");
    }
  };

  const animateBotMessage = (fullText) => {
    let index = 0;
    let currentText = "";

    const interval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        index++;
        setMessages((prev) => {
          const prevWithoutTyping = prev.filter((m) => !m.typing);
          return [
            ...prevWithoutTyping,
            {
              text: currentText,
              sender: "bot",
              time: new Date(),
              typing: true,
            },
          ];
        });
      } else {
        clearInterval(interval);
        setMessages((prev) => {
          const prevWithoutTyping = prev.filter((m) => !m.typing);
          return [
            ...prevWithoutTyping,
            {
              text: fullText,
              sender: "bot",
              time: new Date(),
            },
          ];
        });
        setLoading(false);
      }
    }, 30);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (t) =>
    new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed bottom-0 right-4 w-full max-w-[95%] sm:max-w-sm md:max-w-md lg:max-w-lg z-1000">
      <div className="bg-white dark:bg-neutral-900 text-black dark:text-white p-4 rounded-2xl shadow-2xl flex flex-col space-y-4 h-[75vh] sm:h-[80vh] border border-neutral-300 dark:border-neutral-700">
        {/* Header */}
        <div className="relative flex items-center justify-center space-x-2 text-xl font-bold border-b border-neutral-300 dark:border-neutral-700 pb-3">
          <span>SpyroSphere</span>
          <BsRobot size={30} />
          <button
            onClick={() => closeChat(true)}
            className="absolute top-1 right-2 text-2xl text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close Chat"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Messages container with fixed half screen height */}
        <div className="h-[50vh] overflow-y-auto px-2 space-y-3 bg-gray-50 dark:bg-neutral-800 rounded-lg scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-transparent">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-end space-x-2">
                  {msg.sender === "bot" && <BsRobot size={25} />}
                  <div
                    className={`rounded-2xl px-4 py-2 text-sm max-w-xs break-words ${
                      msg.sender === "user"
                        ? "bg-black text-white"
                        : "bg-gray-200 dark:bg-neutral-700 text-black dark:text-white"
                    }`}
                  >
                    {msg.text}
                    {!msg.typing && (
                      <div className="text-[10px] text-gray-500 mt-1 text-right">
                        {formatTime(msg.time)}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="relative">
              <div className="absolute left-1 bottom-1 ">
                <Loader />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="group flex items-center px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 focus-within:ring-2 focus-within:ring-blue-500">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 resize-none bg-transparent outline-none border-none pl-2 text-black dark:text-white placeholder-gray-400 dark:placeholder-neutral-500"
          />
          <button
            onClick={sendMessage}
            className="ml-2 p-1 hover:bg-neutral-800 rounded-full transition-colors"
            aria-label="Send Message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 664 663"
              className="h-5 w-5 stroke-gray-600 group-hover:stroke-white group-hover:fill-neutral-800 transition-all"
            >
              <path
                fill="none"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              />
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="33.67"
                d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
