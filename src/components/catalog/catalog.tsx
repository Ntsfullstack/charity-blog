import React from 'react';
import './style.scss';

const Catalog= () => {
  // Dữ liệu mẫu
  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5'
  ];

  return (
    <div className="list-container">
      <h2>Danh mục</h2>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </div>
  );
};

export default Catalog;
