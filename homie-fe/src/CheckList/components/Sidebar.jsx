import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/sidebar.css';

const Sidebar = ({ onSelectList, selectedList, onViewAll, onViewCompleted }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // 로컬 스토리지에서 초기값 가져오기
  const getInitialCheckLists = () => {
    const storedLists = localStorage.getItem('checkLists');
    return storedLists
      ? JSON.parse(storedLists)
      : [
          { id: 1, title: '관리비 Check', count: 5 },
          { id: 2, title: '자취 필수품', count: 10 },
          { id: 3, title: '인테리어 쇼핑', count: 2 },
        ];
  };

  const [checkLists, setCheckLists] = useState(getInitialCheckLists());
  const [filteredLists, setFilteredLists] = useState(checkLists); // 검색 결과를 저장
  const [newListTitle, setNewListTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // 목록이 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('checkLists', JSON.stringify(checkLists));
    setFilteredLists(checkLists); // 목록이 변경될 때 검색 결과도 동기화
  }, [checkLists]);

  // 검색 기능 구현
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchTerm.trim() === '') {
        setFilteredLists(checkLists); // 검색어가 없으면 전체 목록 표시
      } else {
        const filtered = checkLists.filter((list) =>
          list.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredLists(filtered); // 검색 결과 저장
      }
    }
  };

  // 원상태로 되돌릴 때 로컬 스토리지에서 데이터 복원
  const resetSearch = () => {
    setSearchTerm('');
    setFilteredLists(checkLists); // 로컬 스토리지에서 복원된 데이터 표시
  };

  // 새로운 목록 추가
  const handleAddNewList = () => {
    if (newListTitle.trim()) {
      const newList = {
        id: Date.now(), // 고유 ID 생성
        title: newListTitle.trim(),
        count: 0, // 초기 count 값 설정
      };
      const updatedLists = [newList, ...checkLists];
      setCheckLists(updatedLists); // 목록 업데이트
      setNewListTitle('');
      setIsAdding(false);
      onSelectList(newList.id, newList.title); // 새로 추가된 목록 선택
    }
  };

  // 목록 삭제
  const handleDeleteList = (id) => {
    const updatedLists = checkLists.filter((list) => list.id !== id);
    setCheckLists(updatedLists);

    if (selectedList === id) {
      if (updatedLists.length > 0) {
        onSelectList(updatedLists[0].id, updatedLists[0].title); // 첫 번째 리스트 선택
      } else {
        onSelectList(null, ''); // 선택된 리스트 없음
      }
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
        <button
          className="add-button"
          onClick={() => setIsAdding(true)}
        >
          + 새로운 목록 만들기
        </button>
      )}

      <button className="home-button" onClick={() => navigate('/')}>
        <span role="img" aria-label="home">🏠</span> 홈으로 돌아가기
      </button>
    </div>
  );
};

export default Sidebar;