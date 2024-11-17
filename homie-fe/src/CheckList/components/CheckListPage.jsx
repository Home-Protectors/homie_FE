import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TodoList from './TodoList';
import NewCheckList from './NewCheckList';
import '../css/checkListPage.css';

const CheckListPage = () => {
  const initialTodos = {
    1: [
      { id: 1, text: '월세', completed: false },
      { id: 2, text: '가스비', completed: false },
      { id: 3, text: '전기세', completed: false },
      { id: 4, text: '수도세', completed: false },
      { id: 5, text: '인터넷 요금', completed: false },
    ],
    2: [
      { id: 6, text: '침대', completed: true },
      { id: 7, text: '냉장고', completed: false },
      { id: 8, text: '책상', completed: false },
    ],
    3: [
      { id: 9, text: '조명', completed: false },
      { id: 10, text: '커튼', completed: true },
    ],
  };

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
  const [selectedList, setSelectedList] = useState(
    checkLists.length > 0 ? checkLists[0].id : null
  );
  const [listTitle, setListTitle] = useState(
    checkLists.length > 0 ? checkLists[0].title : ''
  );
  const [todos, setTodos] = useState([]);
  const [viewMode, setViewMode] = useState('all');
  const [isCreating, setIsCreating] = useState(false);


  
  useEffect(() => {
    if (selectedList !== null) {
      const storedTodos = localStorage.getItem(`todos_${selectedList}`);
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      } else {
        const initialListTodos = initialTodos[selectedList] || [];
        setTodos(initialListTodos);
        localStorage.setItem(`todos_${selectedList}`, JSON.stringify(initialListTodos));
      }
    }
  }, [selectedList]);

  useEffect(() => {
    if (selectedList !== null) {
      localStorage.setItem(`todos_${selectedList}`, JSON.stringify(todos));

      // count 업데이트
      const activeCount = todos.filter(todo => !todo.completed).length;
      setCheckLists(prevCheckLists =>
        prevCheckLists.map(list =>
          list.id === selectedList ? { ...list, count: activeCount } : list
        )
      );
    }
  }, [todos, selectedList]);

  useEffect(() => {
    localStorage.setItem('checkLists', JSON.stringify(checkLists));
  }, [checkLists]);

  const handleSelectList = (id, title) => {
    setSelectedList(id);
    setListTitle(title);
    setViewMode('all');
    setIsCreating(false);
  };

  const handleCreateList = (title) => {
    const newList = { id: Date.now(), title, count: 0 };
    setCheckLists([newList, ...checkLists]);
    localStorage.setItem(`todos_${newList.id}`, JSON.stringify([]));
    handleSelectList(newList.id, title);
    setIsCreating(false);
  };

  const handleDeleteList = (id) => {
    const updatedLists = checkLists.filter((list) => list.id !== id);
    setCheckLists(updatedLists);
    localStorage.removeItem(`todos_${id}`);

    if (selectedList === id) {
      if (updatedLists.length > 0) {
        handleSelectList(updatedLists[0].id, updatedLists[0].title);
      } else {
        handleSelectList(null, '');
      }
    }
  };

  return (
    <div className="checklist-page">
      <div className="content">
        <Sidebar
          checkLists={checkLists}
          onSelectList={handleSelectList}
          selectedList={selectedList}
          onViewAll={() => setViewMode('all')}
          onViewCompleted={() => setViewMode('completed')}
          onCreateList={handleCreateList}
          onDeleteList={handleDeleteList}
        />
        {isCreating ? (
          <NewCheckList onSave={handleCreateList} />
        ) : (
          <TodoList 
            listId={selectedList}
            listTitle={listTitle}
            todos={todos}
            setTodos={setTodos}
            viewMode={viewMode}
          />
        )}
      </div>
    </div>
  );
};

export default CheckListPage;
