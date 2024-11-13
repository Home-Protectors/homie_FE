import React from 'react';

const ItemCard = ({ brand, name, price, imageUrl }) => {
  return (
    <div className="w-[235px] h-[231px] bg-[#f5dcd4] rounded-[30px] p-4">
      <div className="flex justify-center items-center h-[100px] mb-4">
        <img src={imageUrl} alt={name} className="max-h-full" />
      </div>
      <span className="block text-[10px] text-[#595959] font-bold mb-1">{brand}</span>
      <span className="block text-[15px] text-black font-bold mb-1">{name}</span>
      <span className="block text-[15px] text-black font-bold">
        {price.toLocaleString()}
      </span>
    </div>
  );
};

export default ItemCard;
