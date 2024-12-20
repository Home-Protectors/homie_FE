import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // useNavigate 추가
import { Home } from 'lucide-react';  // Home 추가
import ItemCard from './ItemCard';
import ItemModal from './ItemModal';
import '../css/item.css';

import id1 from '../image/id1.png';
import id2 from '../image/id2.png';
import id3 from '../image/id3.png';
import id4 from '../image/id4.png';
import id5 from '../image/id5.png';
import id6 from '../image/id6.png';
import id7 from '../image/id7.png';
import id8 from '../image/id8.png';
import id9 from '../image/id9.png';
import id10 from '../image/id10.png';
import id11 from '../image/id11.png';
import id12 from '../image/id12.png';
import id13 from '../image/id13.png';
import id14 from '../image/id14.png';
import id15 from '../image/id15.png';
import id16 from '../image/id16.png';
import id17 from '../image/id17.png';
import id18 from '../image/id18.png';
import id19 from '../image/id19.png';
import id20 from '../image/id20.png';
import id21 from '../image/id21.png';
import id22 from '../image/id22.png';
import id23 from '../image/id23.png';
import id24 from '../image/id24.png';
import id25 from '../image/id25.png';
import id26 from '../image/id26.png';
import id27 from '../image/id27.png';
import id28 from '../image/id28.png';
import id29 from '../image/id29.png';
import id30 from '../image/id30.png';

const itemData = [
  {
      id: 1,
      brand: "루이스폴센",
      brandsite: "https://www.louispoulsen.com/ko-kr/private",
      name: "판텔라 160 포터블 램프",
      price: 543000,
      image: id1,
      category: "생활용품"
  },
  {
      id: 2,
      brand: "테토",
      brandsite: "https://teto.co.kr/",
      name: "스트라이프 수미파 수건",
      price: 100000,
      image: id2,
      category: "생활용품"
  },
  {
      id: 3,
      brand: "피에르 다르장",
      brandsite: "https://store.ohou.se/",
      name: "프랑스 만능세제 300g",
      price: 15900,
      image: id3,
      category: "청소용품"
  },
  {
      id: 4,
      brand: "자일렉",
      brandsite: "https://zaeleckorea.com/",
      name: "글라스 에어프라이어",
      price: 189000,
      image: id4,
      category: "주방용품"
  },
  {
      id: 5,
      brand: "Scrub Daddy",
      brandsite: "https://scrubdaddy.com/",
      name: "스크럽대디/스크럽마미",
      price: 18000,
      image: id5,
      category: "청소용품"
  },
  {
      id: 6,
      brand: "owooii",
      brandsite: "https://www.owooii.com/",
      name: "스탠딩 드라이어기",
      price: 662000,
      image: id6,
      category: "생활용품"
  },
  {
      id: 7,
      brand: "텔로",
      brandsite: "https://tellomall.co.kr/",
      name: "USB 타워 멀티탭",
      price: 79000,
      image: id7,
      category: "생활용품"
  },
  {
      id: 8,
      brand: "스타우브",
      brandsite: "https://m.zwilling.kr/",
      name: "꼬꼬떼 화이트 트러플",
      price: 219000,
      image: id8,
      category: "주방용품"
  },
  {
      id: 9,
      brand: "OLLY",
      brandsite: "https://www.olly-korea.co.kr/",
      name: "자동센서 휴지통 10L",
      price: 29900,
      image: id9,
      category: "청소용품"
  },
  {
      id: 10,
      brand: "가쯔",
      brandsite: "https://m.gmarket.co.kr/",
      name: "큐포토 육수매트",
      price: 6200,
      image: id10,
      category: "생활용품"
  },
  {
      id: 11,
      brand: "무아스",
      brandsite: "https://mooas.com/",
      name: "세제 자동 디스펜서",
      price: 49800,
      image: id11,
      category: "주방용품"
  },
  {
      id: 12,
      brand: "생활백서",
      brandsite: "https://lifegd100.com/",
      name: "문걸이 3단 건조대",
      price: 28900,
      image: id12,
      category: "생활용품"
  },
  {
      id: 13,
      brand: "디베아",
      brandsite: "https://dibea.co.kr/",
      name: "차이슨 무선청소기",
      price: 249000,
      image: id13,
      category: "청소용품"
  },
  {
      id: 14,
      brand: "보아르",
      brandsite: "https://oa-mall.co.kr/",
      name: "하티포트",
      price: 34000,
      image: id14,
      category: "생활용품"
  },
  {
      id: 15,
      brand: "베베숲",
      brandsite: "https://m.bebesup.co.kr/",
      name: "시그니처 레드",
      price: 48800,
      image: id15,
      category: "생필품"
  },
  {
      id: 16,
      brand: "잘풀리는집",
      brandsite: "https://www.jjtissue.com/",
      name: "미용티슈 250매",
      price: 18900,
      image: id16,
      category: "생필품"
  },
  {
      id: 17,
      brand: "잘풀리는집",
      brandsite: "https://www.jjtissue.com/",
      name: "소프트플클리닉 화장지",
      price: 22400,
      image: id17,
      category: "생필품"
  },
  {
      id: 18,
      brand: "폴센트",
      brandsite: "https://fallcent.com/",
      name: "에어 매트리스",
      price: 86000,
      image: id18,
      category: "생활용품"
  },
  {
      id: 19,
      brand: "네이처리빙",
      brandsite: "https://fallcent.com/",
      name: "릴리브 실리콘 조리도구",
      price: 13900,
      image: id19,
      category: "주방용품"
  },
  {
      id: 20,
      brand: "카모메키친",
      brandsite: "https://cocorobox.com/",
      name: "카모메 국산 수저세트",
      price: 9800,
      image: id20,
      category: "주방용품"
  },
  {
      id: 21,
      brand: "바스",
      brandsite: "https://badairsolution.com/",
      name: "바스 생활 탈취제",
      price: 18400,
      image: id21,
      category: "청소용품"
  },
  {
      id: 22,
      brand: "민트드",
      brandsite: "https://mintedshop.co.kr/",
      name: "자동변기 세정제",
      price: 9920,
      image: id22,
      category: "청소용품"
  },
  {
      id: 23,
      brand: "프로쉬",
      brandsite: "https://frosch.co.kr/",
      name: "패브릭클리너",
      price: 15900,
      image: id23,
      category: "청소용품"
  },
  {
      id: 24,
      brand: "이지드롭",
      brandsite: "https://easydrop.co.kr/",
      name: "매직크린브러시 헤드",
      price: 5000,
      image: id24,
      category: "청소용품"
  },
  {
      id: 25,
      brand: "인블룸",
      brandsite: "https://in-bloom.co.kr/",
      name: "스텐 양념통 3종 자치대세트",
      price: 13800,
      image: id25,
      category: "주방용품"
  },
  {
      id: 26,
      brand: "샤토에르",
      brandsite: "https://senteur.kr/",
      name: "우드 트리 스탠딩 나무 냄비 받침",
      price: 31900,
      image: id26,
      category: "주방용품"
  },
  {
      id: 27,
      brand: "뷰카",
      brandsite: "https://vuca.co.kr/",
      name: "고불소 구취케어치약",
      price: 12900,
      image: id27,
      category: "생필품"
  },
  {
      id: 28,
      brand: "바른생활",
      brandsite: "https://vuca.co.kr/",
      name: "아트컬렉션 칫솔",
      price: 7700,
      image: id28,
      category: "생필품"
  },
  {
      id: 29,
      brand: "오늘의집",
      brandsite: "https://ohou.se/productions/1056568/selling",
      name: "광폭 침대패드 6색상",
      price: 18900,
      image: id29,
      category: "생필품"
  },
  {
      id: 30,
      brand: "코코위즈",
      brandsite: "https://cocowiz.kr/",
      name: "롤헤드 우아한 옌틱 라운드 소주잔",
      price: 4900,
      image: id30,
      category: "주방용품"
  }
 ];

const Item = ({ initialCategory = '전체' }) => {
      const location = useLocation();
      const navigate = useNavigate();  // useNavigate 훅 사용
      const [selectedCategory, setSelectedCategory] = useState(initialCategory);
      const [selectedItem, setSelectedItem] = useState(null);
      const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
      });
    
      // categories 배열을 컴포넌트 내부로 이동
      const categories = useMemo(() => [
        { id: '전체', name: '전체', path: '/tips' },
        { id: '생활용품', name: '생활용품', path: '/tips/living' },
        { id: '주방용품', name: '주방용품', path: '/tips/kitchen' },
        { id: '청소용품', name: '청소용품', path: '/tips/cleaning' },
        { id: '생필품', name: '생필품', path: '/tips/necessities' }
      ], []);
    
      useEffect(() => {
        const path = location.pathname;
        const matchedCategory = categories.find(cat => cat.path === path);
        if (matchedCategory) {
          setSelectedCategory(matchedCategory.id);
        }
      }, [location.pathname, categories]);
    
      useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }, [favorites]);
    
      const filteredItems = selectedCategory === '전체'
        ? itemData
        : itemData.filter(item => item.category === selectedCategory);
    
      const handleHomeClick = () => {
        navigate('/');
      };
    
      const handleCategoryClick = (category) => {
        setSelectedCategory(category.id);
        navigate(category.path);
      };
  
      const handleItemClick = (item) => {
        setSelectedItem(item);
      };
    
      return (
        <div className="item-screen">
          <div className="item-container">
            {/* Navigation */}
            <nav className="item-nav-container">
              <div className="item-nav-wrapper">
                <button 
                  onClick={handleHomeClick}
                  className="item-home-button"
                  aria-label="홈으로 가기"
                >
                  <Home 
                    size={24} 
                    color="white"
                  />
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category)}
                    className={`item-category-button ${selectedCategory === category.id ? 'active' : ''}`}
                  >
                    {category.name}
                  </button>
                ))}
    
                
              </div>
            </nav>
    
            {/* Title */}
            <div className="item-title-container">
              <h1 className="item-title">
                <span className="item-title-star">✦ </span>
                <span className="item-title-main">Recommend Item</span>
                <span className="item-title-star"> ✦</span>
              </h1>
            </div>
    
            {/* Items Grid */}
            <div className="items-grid">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  brand={item.brand}
                  name={item.name}
                  price={item.price}
                  imageUrl={item.image}
                  onClick={() => handleItemClick(item)}
                />
              ))}
            </div>
            {selectedItem && (
              <ItemModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
              />
            )}
          </div>
        </div>
      );
    };
    
    export default Item;