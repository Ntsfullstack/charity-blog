import React, { useState } from 'react';
import { Card, Button } from 'antd';
import styles from './album.module.scss';
import { t } from 'i18next';

const albums = [
  {
    title: 'Kỳ 455: Gia Đình Nghèo, Em L...',
    description: 'QUỸ TỪ THIỆN BÔNG SEN',
    coverImage: 'https://th.bing.com/th/id/OIP.3oeW0zaj7rmvi362IjKvrAAAAA?rs=1&pid=ImgDetMain',
    imageCount: 7
  },
  {
    title: 'KỲ 454: BỆNH NHÂN NGHÈO ...',
    description: 'QUỸ TỪ THIỆN BÔNG SEN',
    coverImage: 'https://i.pinimg.com/236x/a6/61/48/a6614863724c3f037739e634f3ff1e9e.jpg',
    imageCount: 4
  },
  {
    title: 'KỲ 454: BỆNH NHÂN NGHÈO ...',
    description: 'QUỸ TỪ THIỆN BÔNG SEN',
    coverImage: 'https://i.pinimg.com/736x/e4/a7/f8/e4a7f8a8f92bd10dc81fa2786998fedc.jpg',
    imageCount: 8
  },
  {
    title: 'KỲ 454: BỆNH NHÂN NGHÈO ...',
    description: 'QUỸ TỪ THIỆN BÔNG SEN',
    coverImage: 'https://img4.thuthuatphanmem.vn/uploads/2020/08/04/hinh-anime-dep-trai_101450671.jpg',
    imageCount: 8
  },
  {
    title: 'KỲ 454: BỆNH NHÂN NGHÈO ...',
    description: 'QUỸ TỪ THIỆN BÔNG SEN',
    coverImage: 'https://www.invert.vn/media/uploads/uploads/2022/12/06172340-2-anh-anime-nam-de-thuong-cute.png',
    imageCount: 8
  },
  // Add more albums if needed
];

const ImageLibrary: React.FC = () => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 3; // Number of images to show
  
    const nextSlide = () => {
      setStartIndex((prevIndex) => (prevIndex + 1) % Math.max(albums.length - visibleCount + 1, 1));
    };
  
    const prevSlide = () => {
      setStartIndex((prevIndex) => (prevIndex - 1 + Math.max(albums.length - visibleCount + 1, 1)) % Math.max(albums.length - visibleCount + 1, 1));
    };
  
    const displayedAlbums = albums.slice(startIndex, startIndex + visibleCount);
  
    return (
        <div className='container'>
                  <div className={styles.imageLibrary}>
        <div className={styles.libraryHeader}>
          <h1 className={styles.libraryTitle}> {t('library')}</h1>
          <Button type="primary" className={styles.viewAllButton}>{t('all album')}</Button>
        </div>
        <div className={styles.listAlbum}>
          <button
            onClick={prevSlide}
            className={styles.arrowLeft}
          >
            &#9664;
          </button>
          <div className={styles.carousel}>
            {displayedAlbums.map((album, index) => (
              <div key={index} className={styles.albumItem}>
                <Card
                  hoverable
                  cover={<img alt={album.title} src={album.coverImage} className={styles.albumImage} />}
                  className={styles.albumCard}
                >
                  <Card.Meta
                    title={<span className={styles.albumTitle}>{album.title}</span>}
                    description={<span className={styles.albumDescription}>{album.description}</span>}
                  />
                  <div className={styles.albumInfo}>
                    <span className={styles.imageCount}>{album.imageCount} Ảnh</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <button
            onClick={nextSlide}
            className={styles.arrowRight}
          >
            &#9654;
          </button>
        </div>

      </div>

    </div>

    );
  };
export default ImageLibrary;
