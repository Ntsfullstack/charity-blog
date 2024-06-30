import React, { useEffect, useState } from "react";
import style from "./Banner.module.scss";
import { getBanner } from "./api";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bannerData, setBannerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getBanner();
        setBannerData(data);
      } catch (err) {
        console.log("Error fetching banner data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanner();
  }, []); // Empty dependency array ensures this runs only once after initial render

  useEffect(() => {
    if (!isLoading && bannerData.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerData.length);
      }, 7000); // Change slide every 7 seconds

      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }
  }, [isLoading, bannerData.length]); // Restart interval if isLoading or bannerData length changes

  if (isLoading) {
    return <Spin indicator={<LoadingOutlined spin />} size="large" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (bannerData.length === 0) {
    return <div>No banner data available</div>;
  }

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + bannerData.length) % bannerData.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerData.length);
  };

  return (
    <div
      className={style.banner}
      style={{ backgroundImage: `url(${bannerData[currentSlide]})` }} // Adjust as per your data structure
    >
      <button className={style.prev_slide} onClick={goToPrevSlide}>
        &#10094;
      </button>
      <button className={style.next_slide} onClick={goToNextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Banner;
