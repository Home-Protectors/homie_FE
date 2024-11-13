import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // useNavigate 추가
import { Heart, Home } from 'lucide-react';  // Home 추가
import '../css/item.css';

const itemData = [
      {
            id: 1,
            brand: "루이스폴센",
            name: "판텔라 160 포터블 램프",
            price: 543000,
            image: "/api/placeholder/67/100",
            category: "생활용품"
      },
      {
            id: 2,
            brand: "테토",
            name: "스트라이프 수미파 수건",
            price: 100000,
            image: "/api/placeholder/73/88",
            category: "생활용품"
      },
      {
            id: 3,
            brand: "피에르 다르장",
            name: "프랑스 만능세제 300g",
            price: 15900,
            image: "/api/placeholder/96/79",
            category: "청소용품"
      },
      {
            id: 4,
            brand: "자일렉",
            name: "글라스 에어프라이어",
            price: 189000,
            image: "/api/placeholder/77/78",
            category: "주방용품"
      },
      {
            id: 5,
            brand: "Scrub Daddy",
            name: "스크럽대디/스크럽마미",
            price: 18000,
            image: "/api/placeholder/54/78",
            category: "청소용품"
      },
      {
            id: 6,
            brand: "owooii",
            name: "스탠딩 드라이어기",
            price: 662000,
            image: "/api/placeholder/32/100",
            category: "생활용품"
      },
      {
            id: 7,
            brand: "텔로",
            name: "USB 타워 멀티탭",
            price: 79000,
            image: "/api/placeholder/54/95",
            category: "생활용품"
      },
      {
            id: 8,
            brand: "스타우브",
            name: "꼬꼬떼 화이트 트러플",
            price: 219000,
            image: "/api/placeholder/100/71",
            category: "주방용품"
      }
];

const Item = ({ initialCategory = '전체' }) => {
      const location = useLocation();
      const navigate = useNavigate();  // useNavigate 훅 사용
      const [selectedCategory, setSelectedCategory] = useState(initialCategory);
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
    
      const toggleFavorite = (itemId) => {
        setFavorites(prev => 
          prev.includes(itemId)
            ? prev.filter(id => id !== itemId)
            : [...prev, itemId]
        );
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
    
                <button 
                  className="item-favorite-button"
                  aria-label="즐겨찾기"
                >
                  <Heart 
                    size={24}
                    color="white"
                    fill={favorites.length > 0 ? 'white' : 'none'}
                  />
                </button>
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
                <div key={item.id} className="item-card">
                  <div className="item-image-container">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="item-favorite-button"
                      aria-label={`${item.name} 즐겨찾기 ${favorites.includes(item.id) ? '제거' : '추가'}`}
                    >
                      <Heart 
                        size={20}
                        style={{ 
                          color: '#333333',
                          fill: favorites.includes(item.id) ? '#333333' : 'none'
                        }}
                      />
                    </button>
                  </div>
                  <span className="item-brand">{item.brand}</span>
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">
                    {item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
    
    export default Item;