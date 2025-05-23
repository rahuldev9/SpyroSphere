import React from "react";
import { motion } from "framer-motion";
const Team = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 py-16 min-h-screen ">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0"
      >
        <h1 className="text-5xl font-extrabold mb-6 text-white drop-shadow-sm">
          Introducing <span className="text-blue-600">SpyroSphere</span> Project
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          This innovative project is developed by the following students:
        </p>
        <ul className="text-gray-600 list-disc list-inside space-y-2 text-base">
          <li>
            <strong>Rahul</strong>
          </li>
          <li>
            <strong>Poojitha</strong>
          </li>
          <li>
            <strong>Bharath</strong>
          </li>
        </ul>
        <div className="mt-6">
          <p className="text-lg text-gray-600">
            Under the Guidance of
            <span className="font-semibold"> Dr. PALLAVI KHARE</span>, Associate
            professor ECE
          </p>
          <p className="text-lg text-gray-600 mt-2">
            <span className="font-medium">
              Matrusri Engineering College (MECS)
            </span>
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <img
          src="Team.png"
          alt="SpyroSphere Robot"
          className="w-5/6 max-w-md h-auto "
        />
      </motion.div>
    </div>
  );
};

export default Team;
