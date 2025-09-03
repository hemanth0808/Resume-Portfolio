import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ColorfulPortfolio from "./components/ColorfulPortfolio";
import { portfolioData } from "./data/mock";
import { Toaster } from "./components/ui/toaster";
import { testConnection } from "./services/api";

function App() {
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    // Test API connection on app start
    const checkAPI = async () => {
      try {
        await testConnection();
        setApiStatus('connected');
        console.log('✅ Backend API connected successfully');
      } catch (error) {
        setApiStatus('error');
        console.error('❌ Backend API connection failed:', error);
      }
    };

    checkAPI();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={<ColorfulPortfolio data={portfolioData} apiStatus={apiStatus} />} 
          />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;