import React, { useState, useEffect } from "react";
import { Image, Typography, Space, message, Empty } from "antd";
import { getAllImageInAlbum } from "../../../auth/api/auth.api";
import { useParams } from "react-router-dom";
import { AlbumDetail } from "../../../auth/types/types";
import styles from "./album_preview.module.scss";
import emptyBox from "../../../../assets/icons/empty-box.svg";

const { Title } = Typography;

const ImagePreview = () => {
  const { id } = useParams();
  const [data, setData] = useState<AlbumDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAlbum = async (id: string) => {
    try {
      setLoading(true);
      const response = await getAllImageInAlbum(id);
      if (response?.data) {
        setData(response.data[0]);
      } else {
        message.error("Không thể tải album: Không nhận được dữ liệu");
      }
    } catch (error) {
      message.error("Không thể tải album");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAlbum(id);
    }
  }, [id]);

  return (
    <div className={styles.container} style={{ padding: 24 }}>
      <Title level={3}>{data?.title}</Title>
      {loading ? (
        <p>Đang tải...</p>
      ) : data?.images && data.images.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: 100,
          }}
        >
          {data.images.map((image, index) => (
            <div
              key={index}
              style={{
                aspectRatio: "1 / 1",
                borderRadius: "8px",
              }}
            >
              <Image
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
                src={image?.url ? image.url : ""}
                alt={`image-${index}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <Empty
          image={emptyBox}
          imageStyle={{ height: 60 }}
          description={
            <span className={styles.emptyText}>
              Không có ảnh nào trong album này
            </span>
          }
        />
      )}
    </div>
  );
};

export default ImagePreview;
