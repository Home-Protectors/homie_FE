// src/CheckList/components/Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h1 className="sidebar-title">자취 체크리스트</h1>
      
      <div className="search-bar">
        <input type="text" placeholder="검색" />
      </div>
      
      <div className="stats-container">
        <div className="stat-box">
          <span className="stat-number">100</span>
          <span className="stat-label">전체</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">15</span>
          <span className="stat-label">완료됨</span>
        </div>
      </div>
      
      <div className="checklist-nav">
        <div className="nav-item active">
          <span>관리비 Check</span>
          <span className="count">5</span>
        </div>
        <div className="nav-item">
          <span>자취 필수품</span>
          <span className="count">10</span>
        </div>
        <div className="nav-item">
          <span>인테리어 쇼핑</span>
          <span className="count">2</span>
        </div>
      </div>
      
      <button className="home-button" onClick={() => navigate('/')}>
        <span role="img" aria-label="home">🏠</span>
        {' '}홈으로 돌아가기
      </button>
    </div>
  );
};

export default Sidebar;