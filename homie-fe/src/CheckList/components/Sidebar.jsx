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
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLists, setFilteredLists] = useState(checkLists); // Filtered search results
  const [newListTitle, setNewListTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  // Sync filtered lists when checkLists changes
  useEffect(() => {
    setFilteredLists(checkLists);
  }, [checkLists]);

  // Search functionality
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchTerm.trim() === '') {
        setFilteredLists(checkLists);
      } else {
        const filtered = checkLists.filter((list) =>
          list.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLists(filtered);
      }
    }
  };

  // Reset search input
  const resetSearch = () => {
    setSearchTerm('');
    setFilteredLists(checkLists);
  };

  // Add new checklist
  const handleAddNewList = () => {
    if (newListTitle.trim()) {
      onCreateList(newListTitle.trim());
      setNewListTitle('');
      setIsAdding(false);
    }
  };

  // Confirm and delete checklist
  const handleDeleteList = (listId) => {
    const isConfirmed = window.confirm('정말 삭제하시겠습니까?');
    if (isConfirmed) {
      onDeleteList(listId);
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

      <div className="checklist-nav">
        {filteredLists.map((list) => (
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
              X
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