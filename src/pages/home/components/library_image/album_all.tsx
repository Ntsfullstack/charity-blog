import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spin, Pagination, message } from 'antd';
import { getAllAlbum } from '../../../auth/api/auth.api';
import { ImageData } from '../../../auth/types/types';
import Meta from 'antd/es/card/Meta';
import style from  "./album_all.module.scss";


const ImageGallery = () => {
  const [data, setData] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const fetchImages = async (page:any, limit:any) => {
    setLoading(true);
    try {
      const response = await getAllAlbum(page, limit);
      console.log(response)

      if (response.status === 200) {
        setData(response.data);
      } else {
        message.error('Error fetching album data');
      }
    } catch (error) {
      message.error('API call error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(currentPage, pageSize);
  }, [currentPage, pageSize]);

//   const handlePageChange = (page, size) => {
//     setCurrentPage(page);
//     setPageSize(size);
//   };

  return (
    <>
      {loading ? (
        <Spin tip="Loading..." />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {data.map((image, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                 className="image-card"
                hoverable cover={<img alt={image.images?.url} src={image.images?.url} className={style.image} />}>
                  <Meta title={image.title} />
                </Card>
              </Col>
            ))}
          </Row>
         
        </>
      )}
    </>
  );
};

export default ImageGallery;
