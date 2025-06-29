import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptoPage from './pages/CryptoPage';
import CryptoImage from './pages/CryptoImage';
import Chess from './pages/Chess';


function App() {
  return (
    <Router basename="/deployTest">
      <Routes>
        <Route path="/" element={<CryptoPage />} />
        <Route path="/obrazky" element={<CryptoImage />} />
        <Route path="/chess" element={<Chess/>} />
      </Routes>
    </Router>
  );
}

export default App;
