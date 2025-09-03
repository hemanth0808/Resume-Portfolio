import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MonochromePortfolio from "./components/MonochromePortfolio";
import ColorfulPortfolio from "./components/ColorfulPortfolio";
import { portfolioData, designThemes } from "./data/mock";

function App() {
  const [currentTheme, setCurrentTheme] = useState("monochrome");

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "monochrome" ? "colorful" : "monochrome");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="theme-toggle-container">
          <button 
            onClick={toggleTheme}
            className="theme-toggle-btn"
          >
            Switch to {currentTheme === "monochrome" ? "Colorful" : "Monochrome"} Design
          </button>
        </div>
        <Routes>
          <Route 
            path="/" 
            element={
              currentTheme === "monochrome" ? 
              <MonochromePortfolio data={portfolioData} /> : 
              <ColorfulPortfolio data={portfolioData} />
            } 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;