import { motion } from "framer-motion";
import React from "react";
import { FaMicrochip, FaServicestack, FaSyncAlt, FaCamera, FaBolt } from "react-icons/fa";

const Specification = () => {
  const Specifications = [
    {
      title: "Motor Driver (L298N)",
      desc: "Interface between microcontroller and motors.",
      icon: <FaMicrochip size={40} className="text-blue-500 mb-4" />,
    },
    {
      title: "Servo Motor",
      desc: "Their movement shifts the weight, making the sphere roll.",
      icon: <FaServicestack size={40} className="text-green-500 mb-4" />,
    },
    {
      title: "Pendulum",
      desc: "Enables omnidirectional movement by shifting the center of gravity.",
      icon: <FaSyncAlt size={40} className="text-yellow-500 mb-4" />,
    },
    {
      title: "ESP32 Cam",
      desc: "Combines microcontroller + camera + Wi-Fi.",
      icon: <FaCamera size={40} className="text-red-500 mb-4" />,
    },
    {
      title: "Buck Converter",
      desc: "A DC-DC step-down converter.",
      icon: <FaBolt size={40} className="text-purple-500 mb-4" />,
    },
  ];

  return (
    <div className="min-h-screen  py-16 px-6 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-white mb-12 text-center">key Specifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {Specifications.map((spec, index) => (
          <motion.div
            key={spec.title}
            className="bg-gray-800 hover:bg-gray-700 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            {spec.icon}
            <h3 className="text-xl font-semibold mb-2 text-white">{spec.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{spec.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Specification;