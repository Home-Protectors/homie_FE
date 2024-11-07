// src/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 현재 경로에 따라 activeTab 설정
  const [activeTab, setActiveTab] = useState(location.pathname);

  // location이 변경될 때마다 activeTab 업데이트
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleTabClick = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
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
          자취 백과사전
        </button>
        <button 
          className={`nav-button ${activeTab === '/checklist' ? 'active' : ''}`}
          onClick={() => handleTabClick('/checklist')}
          onMouseOver={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          자취 체크리스트
        </button>
        <button 
          className={`nav-button ${activeTab === '/tips' ? 'active' : ''}`}
          onClick={() => handleTabClick('/tips')}
          onMouseOver={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          자취팁 추천
        </button>
      </div>

      <button 
        className="icon-button header-right"
        onMouseOver={(e) => e.currentTarget.classList.add('hover')}
        onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
      >
        <img src="/icons/settings.png" alt="설정" className="icon" />
      </button>
    </header>
  );
};

export default Header;