// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import IntroPage from './Dic/components/IntroPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<IntroPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;