import React, { useEffect, useState } from 'react';
import './style.scss';
import backgroundImage1 from './background1.jpg';
import backgroundImage2 from './background2.jpg';
import backgroundImage3 from './backgorund3.jpg';

const slides = [
  { image: backgroundImage1 },
  { image: backgroundImage2 },
  { image: backgroundImage3 },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 10000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner" style={{ backgroundImage: `url(${slides[currentSlide].image})` }}>
      <button className="prev-slide" onClick={goToPrevSlide}>&#10094;</button>
      <button className="next-slide" onClick={goToNextSlide}>&#10095;</button>
    </div>
  );
}

export default Banner;
