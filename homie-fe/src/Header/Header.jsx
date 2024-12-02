// src/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Set activeTab based on the current path
  const [activeTab, setActiveTab] = useState(location.pathname);

  // Update activeTab whenever the location changes
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handleTabClick = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  const handleClearStorage = () => {
    const confirmed = window.confirm("전체 목록을 초기화하시겠습니까?");
    if (confirmed) {
      localStorage.clear();  // Clear all items
      alert('전체 목록이 초기화되었습니다.');
    }
  };

  return (
    <div className="header-container">
      <header className="header">
        {/* Home Button */}
        <button 
          className="icon-button header-left" 
          onClick={() => navigate('/')}
          onMouseOver={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          <img src="/icons/home.png" alt="홈" className="icon" />
        </button>

        {/* Navigation Buttons */}
        <div className="header-center">
          <button 
            className={`nav-button ${activeTab === '/' ? 'active' : ''}`}
            onClick={() => handleTabClick('/')}
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

        {/* Settings Button */}
        <button 
          onClick={handleClearStorage}
          className="icon-button header-right"
          onMouseOver={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          <img src="/icons/settings.png" alt="설정" className="icon" />
        </button>
      </header>
    </div>
  );
};

export default Header;