import { motion } from "framer-motion";
import SplashScreen from "./SplashScreen";
import { BsRobot } from "react-icons/bs";
import Introduction from "./Introduction";
import React, { useRef } from "react";
import NavBar from "./NavBar";


const Home = () => {
  const capabilitiesRef = useRef(null);
  const features = [
    {
      title: "Stealth Movement",
      desc: "Uses pendulum dynamics for silent and smooth navigation across various terrains.",
    },
    {
      title: "Surveillance Operation",
      desc: "Equipped with camera for environment monitoring.",
    },
    {
      title: "Remote Operability",
      desc: "Seamlessly control and monitor SpyroSphere in real-time.",
    },
    {
      title: "Adaptive Terrain Navigation",
      desc: "Built to traverse sand, grass, and indoor surfaces with ease using dynamic balance correction.",
    },
  ];

  return (
    <>
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>

      <div className="pos min-h-screen  text-white flex flex-col items-center justify-center p-6 space-y-20 ">
        <motion.div
          className="text-center space-y-4 max-w-3xl "
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-md mt-[100px]">
            SpyroSphere
          </h1>
          <p className="text-lg md:text-xl text-gray-300 ">
            Pendulum-driven spherical spy robot for surveillance operations.
          </p>
        </motion.div>

        <div className="text-6xl text-yellow-400 mb-6 animate-bounce  ">
          <BsRobot size={200} />
        </div>
        <motion.div
          className="mt-[100px]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <Introduction />
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-4">
            Ready to experience the future of covert surveillance?
          </p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md"
            onClick={() => {
              capabilitiesRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore SpyroSphere
          </motion.button>
        </motion.div>
        <h1 className="text-4xl font-bold mb-4 text-white-800">
          My Capabilities
        </h1>

        <div
          ref={capabilitiesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SplashScreen />
        </div>
      </div>
    </>
  );
};

export default Home;
