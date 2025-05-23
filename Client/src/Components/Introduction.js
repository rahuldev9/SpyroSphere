import React from "react";

const Introduction = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 ">
      <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
        <h1 className="text-4xl font-bold mb-4 text-white-800">
          Hello, World I'm SpyroSphere!
        </h1>
        <p className="text-lg text-gray-600">
          A pendulum-driven spherical robot utilizes internal pendulum motion to
          achieve omnidirectional movement within a spherical shell. Designed
          for surveillance operations, it offers enhanced maneuverability.
        </p>
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="robot.png"
          alt="Introduction"
          className="w-3/4 max-w-sm h-auto rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Introduction;
