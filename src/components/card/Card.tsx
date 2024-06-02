import React from 'react';
import './style.scss'; // Import the SCSS file for styling
import image1 from './image1.jpg'; // Import the image

const Card = () => {
  // Local data for the cards
  const cardData = [
    {
      imageUrl: image1,
      title: 'Title 1',
      subtitle: 'Subtitle 1',
    },

  ];

  return (
    <div className="card">
      {cardData.map((card, index) => (
        <div key={index} className="card-item">
          <div className="card-image">
            <img src={card.imageUrl} alt="Card" />
          </div>
          <div className="card-content">
            <h2 className="card-title">{card.title}</h2>
            <p className="card-subtitle">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
