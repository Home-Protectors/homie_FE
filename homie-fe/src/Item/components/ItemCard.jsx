import React from 'react';

const ItemCard = ({ brand, name, price, imageUrl, onClick }) => {
  return (
    <div className="item-card" onClick={onClick}>
      <div className="item-image-container">
        <img src={imageUrl} alt={name} className="item-image" />
      </div>
      <span className="item-brand">{brand}</span>
      <span className="item-name">{name}</span>
      <span className="item-price">
        {price.toLocaleString()}
      </span>
    </div>
  );
};

export default ItemCard;

