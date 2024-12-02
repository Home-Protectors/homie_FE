import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext 사용
import './header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth(); // 인증 상태 및 로그아웃 함수 가져오기

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

  const handleLogout = () => {
    const confirmed = window.confirm('로그아웃 하시겠습니까?');
    if (confirmed) {
      logout(); // 로그아웃 함수 호출
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  // 인증 상태에 따라 헤더를 조건부 렌더링
  if (!isAuthenticated) return null;

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

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="icon-button header-right"
          onMouseOver={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
        >
          <img src="/icons/settings.png" alt="로그아웃" className="icon" />
        </button>
      </header>
    </div>
  );
};

export default Header;