import React from 'react';
import '../css/itemmodal.css';

const ItemModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-inner">
            <div className="modal-image-container">
            <a 
                href={item.brandsite} 
                target="_blank" 
                rel="noopener noreferrer"
              >
              <img 
                src={item.image} 
                alt={item.name} 
                className="modal-image"
              />
              </a>
            </div>
            <div className="modal-text">
              <h3 className="modal-brand">{item.brand}</h3>
              <h2 className="modal-name">{item.name}</h2>
              <p className="modal-price">{item.price.toLocaleString()} Won</p>
              <a 
                href={item.brandsite} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="modal-link"
              >
                {item.brandsite}
            </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;