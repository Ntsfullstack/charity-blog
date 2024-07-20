import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import styles from './album.module.scss';

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
];

const ImageLibrary = () => {
  return (
    <div className={styles.imageLibrary}>
      <div className={styles.libraryHeader}>
        <h1 className={styles.libraryTitle}>THƯ VIỆN HÌNH ẢNH</h1>
        <Button type="primary" className={styles.viewAllButton}>TẤT CẢ ALBUM</Button>
      </div>
      <div className={styles.listAlbum}>
        <Row gutter={[16, 16]}>
          {albums.map((album, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
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
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ImageLibrary;
