import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(getActiveTab(location.pathname));

  useEffect(() => {
    setActiveTab(getActiveTab(location.pathname));
  }, [location.pathname]);

  function getActiveTab(path) {
    if (path.startsWith('/tips')) {
      return '/tips';
    }
    return path;
  }

  const handleTabClick = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  const handleLogout = () => {
    const confirmed = window.confirm('로그아웃 하시겠습니까?');
    if (confirmed) {
      logout();
      navigate('/login');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="header-container">
      <header className="header">
        <button
          className="icon-button header-left"
          onClick={() => navigate('/')}
          onMouseOver={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          <img src="/icons/home.png" alt="홈" className="icon" />
        </button>

        <div className="header-center">
          <button
            className={`nav-button ${activeTab === '/' ? 'active' : ''}`}
            onClick={() => handleTabClick('/')}
            onMouseOver={(e) => e.currentTarget.classList.add('hover')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
          >
            자취 Chatbot
          </button>
          <button
            className={`nav-button ${activeTab === '/Dic' ? 'active' : ''}`}
            onClick={() => handleTabClick('/Dic')}
            onMouseOver={(e) => e.currentTarget.classList.add('hover')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
          >
            자취 Dictionary
          </button>
          <button
            className={`nav-button ${activeTab === '/checklist' ? 'active' : ''}`}
            onClick={() => handleTabClick('/checklist')}
            onMouseOver={(e) => e.currentTarget.classList.add('hover')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
          >
            자취 CheckList
          </button>
          <button
            className={`nav-button ${activeTab === '/tips' ? 'active' : ''}`}
            onClick={() => handleTabClick('/tips')}
            onMouseOver={(e) => e.currentTarget.classList.add('hover')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
          >
            자취 Item 추천
          </button>
          <button
            className={`nav-button ${activeTab === '/mypage' ? 'active' : ''}`}
            onClick={() => handleTabClick('/mypage')}
            onMouseOver={(e) => e.currentTarget.classList.add('hover')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
          >
            마이페이지
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="icon-button header-right"
          onMouseOver={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          <img src="/icons/logout.png" alt="로그아웃" className="icon" />
        </button>
      </header>
    </div>
  );
};

export default Header;