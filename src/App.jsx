import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contacts from "./components/Contacts";
import Podfolio from "./components/Portfolio";
import HireMe from "./components/HireMe";
import Navbar from "./components/Navbar";
import Notfound from "./components/NotFound";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Contacts" element={<Contacts />} />
          <Route path="/Podfolio" element={<Podfolio />} />
          <Route path="/HireMe" element={<HireMe />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
