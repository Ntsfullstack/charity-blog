import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin, Pagination, message, Select, Typography, Space } from 'antd';
import { getAllAlbum } from '../../../auth/api/auth.api';
import { ImageData } from '../../../auth/types/types';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import styles from "./album_all.module.scss";

const { Option } = Select;
const { Title } = Typography;

const ImageGallery = () => {
  const [data, setData] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fetchImages = async (page: number, limit: number) => {
    setLoading(true);
    try {
      const response = await getAllAlbum(page, limit);
      console.log(response)

      if (response.status === 200) {
        setData(response.data);
      } else {
        message.error('Lỗi khi tải dữ liệu album');
      }
    } catch (error) {
      message.error('Lỗi khi gọi API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handleSortChange = (value: 'asc' | 'desc') => {
    setSortOrder(value);
    const sortedData = [...data].sort((a, b) => {
      return value === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });
    setData(sortedData);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className={styles.galleryContainer}>
      <Title level={2} className={styles.galleryTitle}>Thư viện ảnh</Title>
      
      <Space className={styles.controlsContainer}>
        <Select
          defaultValue="asc"
          onChange={handleSortChange}
          className={styles.sortSelect}
        >
          <Option value="asc">Sắp xếp A-Z <SortAscendingOutlined /></Option>
          <Option value="desc">Sắp xếp Z-A <SortDescendingOutlined /></Option>
        </Select>
      </Space>

      {loading ? (
        <Spin size="large" className={styles.spinner} />
      ) : error ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : (
        <>
          <Row gutter={[24, 24]} className={styles.imageGrid}>
            {data.map((image, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={<img alt={image.title} src={image.images?.url} className={styles.cardImage} />}
                  className={styles.imageCard}
                >
                  <Card.Meta title={image.title} className={styles.cardMeta} />
                </Card>
              </Col>
            ))}
          </Row>
          
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data.length}
            onChange={handlePageChange}
            className={styles.pagination}
          />
        </>
      )}
    </div>
  );
};

export default ImageGallery;
