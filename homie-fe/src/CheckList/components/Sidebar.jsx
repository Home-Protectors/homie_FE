// src/CheckList/components/Sidebar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/sidebar.css';

const Sidebar = ({ onSelectList, selectedList, onViewAll, onViewCompleted }) => {
      const [searchTerm, setSearchTerm] = useState('');
      const navigate = useNavigate();

      const [checkLists, setCheckLists] = useState([
            { id: 1, title: '관리비 Check', count: 5 },
            { id: 2, title: '자취 필수품', count: 10 },
            { id: 3, title: '인테리어 쇼핑', count: 2 }
      ]);

      // 검색 기능 구현
      const handleSearch = (e) => {
            if (e.key === 'Enter') {
                  const filteredLists = checkLists.filter(list =>
                        list.title.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  setCheckLists(filteredLists);
            }
      };

      return (
            <div className="sidebar">
                  <h1 className="sidebar-title">자취 CheckList</h1>

                  <div className="search-container">
                        <input
                              type="text"
                              placeholder="검색"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              onKeyPress={handleSearch}
                              className="search-input"
                        />
                  </div>

                  <div className="stats-container">
                        <button
                              className="stat-box"
                              onClick={onViewAll}
                        >
                              ALL
                        </button>
                        <button
                              className="stat-box"
                              onClick={onViewCompleted}
                        >
                              DONE
                        </button>
                  </div>

                  <h2 className="section-title">나의 목록</h2>

                  <div className="checklist-nav">
                        {checkLists.map(list => (
                              <button
                                    key={list.id}
                                    className={`nav-item ${selectedList === list.id ? 'active' : ''}`}
                                    onClick={() => onSelectList(list.id)}
                              >
                                    <span>{list.title}</span>
                                    <span className="count">{list.count}</span>
                              </button>
                        ))}
                  </div>

                  <button className="home-button" onClick={() => navigate('/')}>
                        <span role="img" aria-label="home">🏠</span>
                        {' '}홈으로 돌아가기
                  </button>
            </div>
      );
};

export default Sidebar;