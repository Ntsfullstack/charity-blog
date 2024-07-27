import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'antd';
import styles from './album.module.scss';
import { t } from 'i18next';
import { getAllAlbum, getAllImageInAlbum } from '../../../auth/api/auth.api';
import { ImageData, AlbumDetail } from '../../../auth/types/types'; // Đảm bảo import các type cần thiết

const ImageLibrary: React.FC = () => {
  const [albums, setAlbums] = useState<ImageData[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3; // Số lượng album hiển thị
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumDetail | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % Math.max(albums.length - visibleCount + 1, 1));
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + Math.max(albums.length - visibleCount + 1, 1)) % Math.max(albums.length - visibleCount + 1, 1));
  };

  const displayedAlbums = albums.slice(startIndex, startIndex + visibleCount);

  const handleAlbumClick = async (album: ImageData) => {
    try {
      const response = await getAllImageInAlbum(album._id);
      if (response && response.data && response.data.length > 0) {
        setSelectedAlbum(response.data[0]);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết album:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedAlbum(null);
  };

  return (
    <div className='container'>
      <div className={styles.imageLibrary}>
        <div className={styles.libraryHeader}>
          <h1 className={styles.libraryTitle}>{t('library')}</h1>
          <Button type="primary" className={styles.viewAllButton}>{t('all album')}</Button>
        </div>
        <div className={styles.listAlbum}>
          <button onClick={prevSlide} className={styles.arrowLeft}>&#9664;</button>
          <div className={styles.carousel}>
            {displayedAlbums.map((album) => (
              <div key={album._id} className={styles.albumItem} onClick={() => handleAlbumClick(album)}>
                <Card
                  hoverable
                  cover={<img src={album.images[0]} alt={album.title} className={styles.albumImage} />}
                  className={styles.albumCard}
                >
                  <Card.Meta title={album.title} description={`${album.total} ảnh`} />
                </Card>
              </div>
            ))}
          </div>
          <button onClick={nextSlide} className={styles.arrowRight}>&#9654;</button>
        </div>
      </div>
      
      <Modal
        title={selectedAlbum?.title}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        <div className={styles.albumDetailGrid}>
          {selectedAlbum?.images.map((image) => (
            <img key={image._id} src={image.url} alt="" className={styles.albumDetailImage} />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ImageLibrary;