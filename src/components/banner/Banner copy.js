import React, { useEffect, useState } from "react";
import style from "./Banner.module.scss";
import { getBanner } from "./api";
import { Carousel, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getBanner();
        setBannerData(data);
      } catch (err) {
        setError("Error fetching banner data"); // Provide a user-friendly error message
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanner();
  }, []);

  if (isLoading) {
    return <Spin indicator={<LoadingOutlined spin />} size="large" />; // Loading indicator while fetching data
  }

  if (error) {
    return <div className={style.error}>{error}</div>; // Display error message with styling
  }

  if (bannerData.length === 0) {
    return <div className={style.noData}>No banner data available</div>; // Handle case of no data
  }

  return (
    <Carousel autoplay className={style.bannerCarousel}>
      {bannerData.map((banner, index) => (
        <div key={index} className={style.bannerSlide}>
          <img
            src={banner.imageUrl}
            alt={`Banner ${index + 1}`}
            className={style.bannerImage}
          />
          {/* Assuming your banner data has an 'imageUrl' property */}
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
