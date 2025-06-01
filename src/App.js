import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptoPage from './pages/CryptoPage';

function App() {
  return (
    <Router basename="/deployTest">
      <Routes>
        <Route path="/" element={<CryptoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
