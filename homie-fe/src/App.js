// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './Header/Header';
import IntroPage from './Dic/components/IntroPage';
import CheckListPage from './CheckList/components/CheckListPage';
import './App.css';

// AppContent를 별도 컴포넌트로 분리
function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={400}
          classNames="page"
        >
          <div className="page-container">
            <Routes location={location}>
              <Route path="/" element={<IntroPage />} />
              <Route path="/checklist" element={<CheckListPage />} />
              <Route path="/tips" element={<div>Tips Page Coming Soon</div>} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

// 메인 App 컴포넌트
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;