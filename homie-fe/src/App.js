import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './Header/Header';
import IntroPage from './Dic/components/IntroPage';
import CheckListPage from './CheckList/components/CheckListPage';
import Item from './Item/components/Item';
import DicPageCost from './Dic/components/DicPageCost';
import MyPage from './MyPage/MyPage';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import './App.css';

const ItemWrapper = ({ category }) => {
  return <Item initialCategory={category} />;
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppContent() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      {isAuthenticated && <Header />}
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={400} classNames="page">
          <div className="page-container">
            <Routes location={location}>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <IntroPage />
                </ProtectedRoute>
              } />
              <Route path="/checklist" element={
                <ProtectedRoute>
                  <CheckListPage />
                </ProtectedRoute>
              } />
              <Route path="/mypage" element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              } />
              <Route path="/Dic" element={
                <ProtectedRoute>
                  <DicPageCost />
                </ProtectedRoute>
              } />
              <Route path="/tips" element={
                <ProtectedRoute>
                  <ItemWrapper category="전체" />
                </ProtectedRoute>
              } />
              <Route path="/tips/living" element={
                <ProtectedRoute>
                  <ItemWrapper category="생활용품" />
                </ProtectedRoute>
              } />
              <Route path="/tips/kitchen" element={
                <ProtectedRoute>
                  <ItemWrapper category="주방용품" />
                </ProtectedRoute>
              } />
              <Route path="/tips/cleaning" element={
                <ProtectedRoute>
                  <ItemWrapper category="청소용품" />
                </ProtectedRoute>
              } />
              <Route path="/tips/necessities" element={
                <ProtectedRoute>
                  <ItemWrapper category="생필품" />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;