import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TodoList from './TodoList';
import NewCheckList from './NewCheckList';
import '../css/checkListPage.css';

const CheckListPage = () => {
  const [selectedList, setSelectedList] = useState(1); // 현재 선택된 리스트
  const [viewMode, setViewMode] = useState('all'); // all 또는 completed
  const [isCreating, setIsCreating] = useState(false); // 체크리스트 생성 여부

  // 리스트 선택 핸들러
  const handleSelectList = (id) => {
    setSelectedList(id); // 선택된 리스트 업데이트
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
 // 새로운 리스트 생성
const handleCreateList = (title) => {
  const newList = {
    id: Date.now(),
    title,
    count: 0,
  };
  setIsCreating(false); // 생성 모드 해제
  handleSelectList(newList.id); // 새로 생성된 리스트 선택
};

  return (
    <div className="checklist-page">
      <div className="content">
        <Sidebar
          onSelectList={handleSelectList} // 리스트 선택 핸들러 전달
          selectedList={selectedList} // 선택된 리스트 ID 전달
          onViewAll={handleViewAll}
          onViewCompleted={handleViewCompleted}
        />
        {isCreating ? (
          <NewCheckList onSave={handleCreateList} />
        ) : (
          <TodoList 
            listId={selectedList} // 선택된 리스트 ID 전달
            viewMode={viewMode} // 현재 뷰 모드 전달
          />
        )}
      </div>
    </div>
  );
};

export default CheckListPage;