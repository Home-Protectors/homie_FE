// src/CheckList/components/CheckListPage.jsx
import React from 'react';
import Sidebar from './Sidebar';
import TodoList from './TodoList';
import '../css/checkListPage.css';

const CheckListPage = () => {
  return (
    <div className="checklist-page">
      <div className="content">
        <Sidebar />
        <TodoList />
      </div>
    </div>
  );
};

export default CheckListPage;