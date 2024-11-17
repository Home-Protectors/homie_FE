import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TodoList from './TodoList';
import NewCheckList from './NewCheckList';
import '../css/checkListPage.css';

const CheckListPage = () => {
  const getInitialCheckLists = () => {
    try {
      const storedLists = localStorage.getItem('checkLists');
      return storedLists
        ? JSON.parse(storedLists)
        : [
            { id: 1, title: '관리비 Check', count: 5 },
            { id: 2, title: '자취 필수품', count: 10 },
            { id: 3, title: '인테리어 쇼핑', count: 2 },
          ];
    } catch (error) {
      console.error('Failed to load checklists from localStorage:', error);
      return [
        { id: 1, title: '관리비 Check', count: 5 },
        { id: 2, title: '자취 필수품', count: 10 },
        { id: 3, title: '인테리어 쇼핑', count: 2 },
      ];
    }
  };

  const [checkLists, setCheckLists] = useState(getInitialCheckLists);
  const [selectedList, setSelectedList] = useState(() =>
    checkLists.length > 0 ? checkLists[0].id : null
  );
  const [listTitle, setListTitle] = useState(() =>
    checkLists.length > 0 ? checkLists[0].title : ''
  );
  const [viewMode, setViewMode] = useState('all'); // all 또는 completed
  const [isCreating, setIsCreating] = useState(false); // 체크리스트 생성 여부

  // 로컬 스토리지에 체크리스트 저장
  useEffect(() => {
    localStorage.setItem('checkLists', JSON.stringify(checkLists));
  }, [checkLists]);

  // 리스트 선택 핸들러
  const handleSelectList = (id, title) => {
    setSelectedList(id); // 선택된 리스트 ID 업데이트
    setListTitle(title); // 선택된 리스트 제목 업데이트
    setViewMode('all'); // viewMode 초기화
    setIsCreating(false); // 생성 모드 해제
  };

  // 전체 보기
  const handleViewAll = () => {
    setViewMode('all');
  };

  // 완료된 항목만 보기
  const handleViewCompleted = () => {
    setViewMode('completed');
  };

  // 새로운 리스트 생성
  const handleCreateList = (title) => {
    const newListId = Date.now(); // 고유 ID 생성
    const newList = { id: newListId, title, count: 0 };

    // 새 리스트 추가 및 선택
    setCheckLists([newList, ...checkLists]);
    setSelectedList(newListId);
    setListTitle(title);

    // 새로운 리스트의 todos 초기화
    localStorage.setItem(`todos_${newListId}`, JSON.stringify([]));
    setIsCreating(false);
  };

  return (
    <div className="checklist-page">
      <div className="content">
        <Sidebar
          onSelectList={(id, title) => handleSelectList(id, title)} // 리스트 선택 핸들러 전달
          selectedList={selectedList} // 선택된 리스트 ID 전달
          onViewAll={handleViewAll}
          onViewCompleted={handleViewCompleted}
          checkLists={checkLists} // 체크리스트 전달
          setCheckLists={setCheckLists} // 체크리스트 업데이트 함수 전달
        />
        {isCreating ? (
          <NewCheckList onSave={handleCreateList} />
        ) : (
          <TodoList 
            listId={selectedList} // 선택된 리스트 ID 전달
            listTitle={listTitle} // 선택된 리스트 제목 전달
            viewMode={viewMode} // 현재 뷰 모드 전달
          />
        )}
      </div>
    </div>
  );
};

export default CheckListPage;