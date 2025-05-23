import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BsRobot } from "react-icons/bs";

import Chatbot from "./Chatbot";

const NavBar = () => {
  const [openChat, setOpenChat] = useState(false);

  const toggleChat = () => {
    setOpenChat((prev) => !prev);
  };

  useEffect(() => {
    if (openChat) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openChat]);

  return (
    <div className="sticky top-0 z-50">
      <div className="h-[70px] shadow-md flex justify-between items-center bg-transparent backdrop-blur-sm mx-auto">
        <motion.h2
          className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent m-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          SpyroSphere
        </motion.h2>

        <motion.div
          onClick={toggleChat} 
          whileHover={{ y: -5, scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative group cursor-pointer right-3"
        >
          <div className="relative">
            <span className="absolute -inset-1.5 rounded-full bg-fuchsia-500 opacity-20 blur-lg group-hover:animate-ping" />
            <BsRobot
              className="text-gray-400 group-hover:text-fuchsia-500 transition-colors duration-300"
              size={30}
            />
          </div>
        </motion.div>
      </div>

      {openChat && <Chatbot closeChat={() => setOpenChat(false)} />}
    </div>
  );
};

export default NavBar;
