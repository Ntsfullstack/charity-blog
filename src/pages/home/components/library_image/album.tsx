import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Skeleton, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { PictureOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import emptyBox from "../../../../assets/icons/empty-box.svg";

import { t } from "i18next";
import styles from "./album.module.scss";
import { getAllAlbum } from "../../../auth/api/auth.api";
import { ImageData } from "../../../auth/types/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageLibrary: React.FC = () => {
  const [albums, setAlbums] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigate();
  const swiperRef = useRef<SwiperType>();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await getAllAlbum();
        setAlbums(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải album:", error);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const renderAlbumCard = (album: ImageData) => (
    <Card
      hoverable
      cover={
        <div className={styles.albumImageWrapper}>
          {album.images?.url ? (
            <img
              src={album.images.url}
              alt={album.title}
              className={styles.albumImage}
            />
          ) : (
            <div className={styles.placeholderImage}>
              <PictureOutlined />
            </div>
          )}
        </div>
      }
      className={styles.albumCard}
      onClick={() => navigation(`/album/${album._id}`)}
    >
      <Card.Meta
        title={<span className={styles.albumTitle}>{album.title}</span>}
        description={
          <span
            className={styles.albumDescription}
          >{`${album.total} ảnh`}</span>
        }
      />
    </Card>
  );

  return (
    <div className={styles.container}>
      <div className={styles.imageLibrary}>
        <div className={styles.libraryHeader}>
          <h1 className={styles.libraryTitle}>{t("library")}</h1>
          <Button
            type="primary"
            className={styles.viewAllButton}
            onClick={() => navigation("/album-all")}
          >
            {t("all album")}
          </Button>
        </div>
        {loading ? (
          <div className={styles.slideshow}>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className={styles.swiper}
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <Card className={styles.albumCard}>
                    <Skeleton.Image active className={styles.skeletonImage} />
                    <Skeleton active paragraph={{ rows: 1 }} />
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : albums.length === 0 ? (
          <Empty
            image={emptyBox}
            imageStyle={{ height: 60 }}
            description={
              <span className={styles.emptyText}>
                {t("Không có album nào")}
              </span>
            }
          />
        ) : (
          <div className={styles.slideshow}>
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              &#10094;
            </button>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className={styles.swiper}
            >
              {albums.map((album) => (
                <SwiperSlide key={album._id}>
                  {renderAlbumCard(album)}
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={() => swiperRef.current?.slideNext()}
            >
              &#10095;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageLibrary;
