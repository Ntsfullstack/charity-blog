import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Modal } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './album.module.scss';
import { t } from 'i18next';
import { getAllAlbum, getAllImageInAlbum } from '../../../auth/api/auth.api';
import { ImageData, AlbumDetail } from '../../../auth/types/types';
import { useNavigate } from 'react-router-dom';

const ImageLibrary: React.FC = () => {
  const [albums, setAlbums] = useState<ImageData[]>([]);
  const swiperRef = useRef<SwiperType>();
  const navigation = useNavigate();

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const page = 1;
      const pageSize = 10;
      const response = await getAllAlbum(page, pageSize);
      if (response && response.data) {
        setAlbums(response.data);
      }
    } catch (error) {
      console.error('Lỗi khi lấy albums:', error);
    }
  };

  return (
    <div className='container'>
      <div className={styles.imageLibrary}>
        <div className={styles.libraryHeader}>
          <h1 className={styles.libraryTitle}>{t('library')}</h1>
          <Button type="primary" className={styles.viewAllButton} onClick={
            () => navigation('/album-all')
          }>{t('all album')}</Button>
        </div>
        <div className={styles.listAlbum}>
          <button className={styles.arrowLeft} onClick={() => swiperRef.current?.slidePrev()}>&#9664;</button>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            pagination={{ clickable: true }}
            className={styles.swiper}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {albums.map((album, index) => (
              <SwiperSlide key={album._id} className={styles.swiperSlide}>
                <div className={styles.albumItem} onClick={() => {
                  navigation(`/album/${album._id}`);
                }}>
                  <Card
                    hoverable
                    cover={<img src={album.images?.url ?? 'https://via.placeholder.com/150'} alt={album.title} className={styles.albumImage} />}
                    className={styles.albumCard}
                  >
                    <Card.Meta title={album.title} description={`${album.total} ảnh`} />
                  </Card>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className={styles.arrowRight} onClick={() => swiperRef.current?.slideNext()}>&#9654;</button>
        </div>
      </div>
      
      
    </div>
  );
};

export default ImageLibrary;