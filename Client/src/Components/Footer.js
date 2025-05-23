import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        

        <div>
          <h2 className="text-xl font-semibold mb-2">About SpyroSphere</h2>
          <p className="text-gray-400 text-sm">
            SpyroSphere is a pendulum-driven spherical robot designed for efficient surveillance and adaptive terrain navigation.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <div className="flex space-x-4 text-gray-400">
            <a href="rahulmudavath333@gmail.com" className="hover:text-white"><FaEnvelope size={20} /></a>
            <a href="https://github.com/rahuldev9/SpyroSphere" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaGithub size={20} /></a>
            <a href="https://www.linkedin.com/in/rahul-mudavath-848978301/" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaLinkedin size={20} /></a>
          </div>
          <p className="text-xs text-gray-500 mt-4">© {new Date().getFullYear()} SpyroSphere Project</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
