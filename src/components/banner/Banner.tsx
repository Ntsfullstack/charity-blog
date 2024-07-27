import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getBanner } from "./api";
import styles from './Banner.module.scss';

interface BannerImage {
  url: string;
  _id: string;
}

interface BannerData {
  _id: string;
  images: BannerImage[];
  id: string;
  __v: number;
}

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bannerData, setBannerData] = useState<BannerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setIsLoading(true);
        const data = await getBanner();
        if (Array.isArray(data) && data?.length > 0) {
          setBannerData(data[0]);
        } else {
          throw new Error("Invalid banner data format");
        }
      } catch (err) {
        console.error("Error fetching banner data:", err);
        setError("Failed to load banner images. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanner();
  }, []);

  useEffect(() => {
    if (bannerData && bannerData?.images.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerData?.images.length);
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [bannerData]);

  const goToSlide = (index: number) => {
    if (bannerData) {
      setCurrentSlide(index);
    }
  };

  if (isLoading) {
    return (
      <div className={styles['loading-container']}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        <p>Loading banner images...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles['error-container']}>{error}</div>;
  }

  if (!bannerData || bannerData?.images.length === 0) {
    return <div className={styles['no-data-container']}>No banner images available</div>;
  }

  return (
    <div className={styles.banner}>
      <div className={styles.slideshow}>
        {bannerData?.images.map((image, index) => (
          <div
            key={image._id}
            className={index === currentSlide ? styles.active : ''}
          >
            <img src={image.url} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className={styles['slideshow-controls']}>
        <button className={styles['prev-slide']} onClick={() => goToSlide((currentSlide - 1 + bannerData.images.length) % bannerData.images.length)}>
          &#10094;
        </button>
        <button className={styles['next-slide']} onClick={() => goToSlide((currentSlide + 1) % bannerData.images.length)}>
          &#10095;
        </button>
      </div>
      <div className={styles['slideshow-indicators']}>
        {bannerData?.images.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;