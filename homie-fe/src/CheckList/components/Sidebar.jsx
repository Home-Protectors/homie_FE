import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/sidebar.css';

const Sidebar = ({
      checkLists,
      onSelectList,
      selectedList,
      onViewAll,
      onViewCompleted,
      onCreateList,
      onDeleteList,
      onSearchTodos, // 새로 추가된 콜백 함수
}) => {
      const [searchTerm, setSearchTerm] = useState('');
      const [filteredLists, setFilteredLists] = useState(checkLists); // Filtered search results
      const [newListTitle, setNewListTitle] = useState('');
      const [isAdding, setIsAdding] = useState(false);
      const navigate = useNavigate();

      // 검색어를 기반으로 체크리스트 필터링
      useEffect(() => {
            if (searchTerm.trim() === '') {
                  setFilteredLists(checkLists); // 검색어가 없을 경우 전체 리스트를 보여줍니다.
            } else {
                  const filtered = checkLists.filter((list) =>
                        list.title.toLowerCase().includes(searchTerm.toLowerCase()) // 검색어와 제목 비교
                  );
                  setFilteredLists(filtered); // 필터링된 결과 업데이트
            }
      }, [searchTerm, checkLists]);

      const handleSearchChange = (e) => {
            const term = e.target.value;
            setSearchTerm(term); // 검색어 상태 업데이트
            onSearchTodos(term); // 부모 컴포넌트로 검색어 전달
      };

      const resetSearch = () => {
            setSearchTerm(''); // 검색 초기화
            setFilteredLists(checkLists); // 원래 목록 복원
            onSearchTodos(''); // 전체 표시로 복원
      };

      const handleAddNewList = () => {
            if (newListTitle.trim()) {
                  onCreateList(newListTitle.trim());
                  setNewListTitle('');
                  setIsAdding(false);
            }
      };

      const handleDeleteList = (listId) => {
            const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
            if (isConfirmed) {
                  onDeleteList(listId);
            }
      };

      // Calculate indicator position
      const indicatorStyle = {
            transform: `translateY(${checkLists.findIndex((list) => list.id === selectedList) * 45
                  }px)`,
            transition: 'transform 0.3s ease',
            position: 'absolute',
            width: '105%',  // 여기를 수정
            height: '45px',
            backgroundColor: 'white',
            zIndex: 0,
            borderRadius: '12px',  // 여기를 추가
            margin: '0 -2px'  // 여기를 추가
      };

      return (
            <div className="sidebar">
                  <h1 className="sidebar-title">자취 CheckList</h1>

                  {/* 검색 기능 추가 */}
                  <div className="search-container">
                        <input
                              type="text"
                              placeholder="검색"
                              value={searchTerm}
                              onChange={handleSearchChange}
                              className="search-input"
                        />
                        {searchTerm && (
                              <button className="reset-button" onClick={resetSearch}>
                                    X
                              </button>
                        )}
                  </div>

                  <div className="stats-container">
                        <button
                              className={`stat-box ${selectedList === 'all' ? 'active' : ''}`}
                              onClick={onViewAll}
                        >
                              ALL
                        </button>
                        <button
                              className={`stat-box ${selectedList === 'done' ? 'active' : ''}`}
                              onClick={onViewCompleted}
                        >
                              DONE
                        </button>
                  </div>

                  <h2 className="section-title">나의 목록</h2>

                  <div className="checklist-nav" style={{ position: 'relative' }}>
                        {/* Selection Indicator */}
                        <div style={indicatorStyle}></div>
                        {checkLists.map((list) => (
                              <div key={list.id} className="nav-item-container">
                                    <button
                                          className={`nav-item ${selectedList === list.id ? 'active' : ''}`}
                                          onClick={() => onSelectList(list.id, list.title)}
                                    >
                                          <span>{list.title}</span>
                                          <span className="count">{list.count}</span>
                                    </button>
                                    <button
                                          className="delete-list-button"
                                          onClick={() => handleDeleteList(list.id)}
                                          aria-label="삭제"
                                    >
                                          🗑️
                                    </button>
                              </div>
                        ))}
                  </div>

                  {isAdding ? (
                        <div className="add-new-list">
                              <input
                                    type="text"
                                    placeholder="새로운 목록 이름"
                                    value={newListTitle}
                                    onChange={(e) => setNewListTitle(e.target.value)}
                                    className="new-list-input"
                              />
                              <button className="save-button" onClick={handleAddNewList}>
                                    저장
                              </button>
                              <button className="cancel-button" onClick={() => setIsAdding(false)}>
                                    취소
                              </button>
                        </div>
                  ) : (
                        <button className="add-button" onClick={() => setIsAdding(true)}>
                              + 새로운 목록 만들기
                        </button>
                  )}

                  <button className="home-button" onClick={() => navigate('/')}>
                        <span role="img" aria-label="home">
                              🏠
                        </span>{' '}
                        홈으로 돌아가기
                  </button>
            </div>
      );
};

export default Sidebar;