import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TodoList from './TodoList';
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
      { id: 6, text: '침대', completed: false },
      { id: 7, text: '냉장고', completed: false },
      { id: 8, text: '책상', completed: false },
    ],
    3: [
      { id: 9, text: '조명', completed: false },
      { id: 10, text: '커튼', completed: false },
    ],
  };

  const getInitialCheckLists = () => {
    try {
      const storedLists = localStorage.getItem('checkLists');
      return storedLists
        ? JSON.parse(storedLists)
        : [
            { id: 1, title: '관리비 Check', count: 5 },
            { id: 2, title: '자취 필수품', count: 3 },
            { id: 3, title: '인테리어 쇼핑', count: 2 },
          ];
    } catch (error) {
      console.error('Failed to load checklists from localStorage:', error);
      return [
        { id: 1, title: '관리비 Check', count: 5 },
        { id: 2, title: '자취 필수품', count: 3 },
        { id: 3, title: '인테리어 쇼핑', count: 2 },
      ];
    }
  };

  const [checkLists, setCheckLists] = useState(getInitialCheckLists);
  const [selectedList, setSelectedList] = useState(null); // 초기값을 null로 설정합니다.
  const [listTitle, setListTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [viewMode, setViewMode] = useState('all');

  // 초기 로드 시 checkLists와 todos를 설정하는 useEffect
  useEffect(() => {
    const storedCheckLists = localStorage.getItem('checkLists');
    if (storedCheckLists) {
      const parsedCheckLists = JSON.parse(storedCheckLists);
      setCheckLists(parsedCheckLists);

      // checkLists의 첫 번째 항목을 선택.
      if (parsedCheckLists.length > 0) {
        const firstList = parsedCheckLists[0];
        setSelectedList(firstList.id);
        setListTitle(firstList.title);

        // 첫 번째 리스트의 todos를 불러옵니다.
        const storedTodos = localStorage.getItem(`todos_${firstList.id}`);
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        } else {
          const initialListTodos = initialTodos[firstList.id] || [];
          setTodos(initialListTodos);
          localStorage.setItem(`todos_${firstList.id}`, JSON.stringify(initialListTodos));
        }
      }
    }
  }, []);

  // selectedList가 변경될 때마다 todos를 불러오는 useEffect
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

  // todos 변경 시 로컬 스토리지에 저장하고 count를 업데이트하는 useEffect
  useEffect(() => {
    if (selectedList !== null) {
      // todos가 변경될 때마다 로컬 스토리지에 저장
      localStorage.setItem(`todos_${selectedList}`, JSON.stringify(todos));

      // count 업데이트 및 checkLists 로컬 스토리지 저장
      const activeCount = todos.filter(todo => !todo.completed).length;
      const updatedCheckLists = checkLists.map(list =>
        list.id === selectedList ? { ...list, count: activeCount } : list
      );
      setCheckLists(updatedCheckLists);
      localStorage.setItem('checkLists', JSON.stringify(updatedCheckLists));
    }
  }, [todos, selectedList]);

  const handleSelectList = (id, title) => {
    setSelectedList(id);
    setListTitle(title);
    setViewMode('all');
  };

  const handleCreateList = (title) => {
    const newList = { id: Date.now(), title, count: 0 };
    setCheckLists([newList, ...checkLists]);
    localStorage.setItem(`todos_${newList.id}`, JSON.stringify([]));
    handleSelectList(newList.id, title);
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
        <TodoList 
          listId={selectedList}
          listTitle={listTitle}
          todos={todos}
          setTodos={setTodos}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
};

export default CheckListPage;
