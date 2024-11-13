import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './Header/Header';
import IntroPage from './Dic/components/IntroPage';
import CheckListPage from './CheckList/components/CheckListPage';
import ExpensePlanPage from './Dic/components/ExpensePlanPage';
import HouseViewingPage from './Dic/components/HouseViewingPage';
import HouseTypesPage from './Dic/components/HouseTypesPage';
import PreContractPage from './Dic/components/PreContractPage';
import ContractPage from './Dic/components/ContractPage';
import JeonseInfoPage from './Dic/components/JeonseInfoPage';
import Item from './Item/components/Item';
import './App.css';

// ItemWrapper 컴포넌트 추가
const ItemWrapper = ({ category }) => {
  return <Item initialCategory={category} />;
};

// AppContent를 별도 컴포넌트로 분리
function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={400}
          classNames="page"
        >
          <div className="page-container">
            <Routes location={location}>
              <Route path="/" element={<IntroPage />} />
              <Route path="/checklist" element={<CheckListPage />} />
              
              {/* /tips 경로에 Item 컴포넌트 연결 */}
              <Route path="/tips" element={<ItemWrapper category="전체" />} />
              <Route path="/tips/living" element={<ItemWrapper category="생활용품" />} />
              <Route path="/tips/kitchen" element={<ItemWrapper category="주방용품" />} />
              <Route path="/tips/cleaning" element={<ItemWrapper category="청소용품" />} />
              <Route path="/tips/necessities" element={<ItemWrapper category="생필품" />} />
              
              <Route path="/detailInfo/expense-plan" element={<ExpensePlanPage />} />
              <Route path="/detailInfo/house-viewing" element={<HouseViewingPage />} />
              <Route path="/detailInfo/house-types" element={<HouseTypesPage />} />
              <Route path="/detailInfo/pre-contract" element={<PreContractPage />} />
              <Route path="/detailInfo/contract" element={<ContractPage />} />
              <Route path="/detailInfo/jeonse-info" element={<JeonseInfoPage />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

// 메인 App 컴포넌트
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;