// src/Header/Header.jsx
import React, { useState } from 'react';
import './header.css';

const Header = () => {
  const [activeTab, setActiveTab] = useState('백과사전');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <header className="header">
      <button className="icon-button header-left">
        <img src="/icons/home.png" alt="홈" className="icon" />
      </button>

      <div className="header-center">
        <button 
          className={`nav-button ${activeTab === '백과사전' ? 'active' : ''}`}
          onClick={() => handleTabClick('백과사전')}
        >
          자취 백과사전
        </button>
        <button 
          className={`nav-button ${activeTab === '체크리스트' ? 'active' : ''}`}
          onClick={() => handleTabClick('체크리스트')}
        >
          자취 체크리스트
        </button>
        <button 
          className={`nav-button ${activeTab === '추천' ? 'active' : ''}`}
          onClick={() => handleTabClick('추천')}
        >
          자취팁 추천
        </button>
      </div>

      <button className="icon-button header-right">
        <img src="/icons/settings.png" alt="설정" className="icon" />
      </button>
    </header>
  );
};

export default Header;