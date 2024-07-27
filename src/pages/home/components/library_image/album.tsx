import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'antd';
import styles from './album.module.scss';
import { t } from 'i18next';
import { getAllImageInAlbum } from '../../../auth/api/auth.api'; 

const ImageLibrary: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3; // Số lượng album hiển thị
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await getAllImageInAlbum('id');
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

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    setIsModalVisible(true);
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
                  cover={<img src={album.images[0]?.url} alt={album.title} className={styles.albumImage} />}
                  className={styles.albumCard}
                >
                  <Card.Meta title={album.title} description={`${album.images.length} ảnh`} />
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