import React from "react";

import Home from "./Components/Home";

import Specifications from "./Components/Specifications";
import Team from "./Components/Team";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Home />
      <Specifications />
      <Team />
      <Footer />
    </div>
  );
};

export default App;
