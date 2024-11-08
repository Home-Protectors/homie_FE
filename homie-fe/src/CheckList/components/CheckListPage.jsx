// src/CheckList/components/CheckListPage.jsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TodoList from './TodoList';
import NewCheckList from './NewCheckList';
import '../css/checkListPage.css';

const CheckListPage = () => {
  const [selectedList, setSelectedList] = useState(1);
  const [viewMode, setViewMode] = useState('all');
  const [isCreating, setIsCreating] = useState(false);

  const handleSelectList = (id) => {
    setSelectedList(id);
    setViewMode('all');
  };

  const handleViewAll = () => {
    setViewMode('all');
  };

  const handleViewCompleted = () => {
    setViewMode('completed');
  };

  const handleCreateList = (title) => {
    setIsCreating(false);
  };

  return (
    <div className="checklist-page">
      <div className="content">
        <Sidebar 
          onSelectList={handleSelectList}
          selectedList={selectedList}
          onViewAll={handleViewAll}
          onViewCompleted={handleViewCompleted}
        />
        {isCreating ? (
          <NewCheckList onSave={handleCreateList} />
        ) : (
          <TodoList 
            listId={selectedList} 
            viewMode={viewMode}
          />
        )}
      </div>
    </div>
  );
};

export default CheckListPage;