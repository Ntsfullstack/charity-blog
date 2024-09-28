import React, { useState, useEffect } from "react";
import { Image, Typography, Space, message } from "antd";
import { getAllImageInAlbum } from "../../../auth/api/auth.api";
import { useParams } from "react-router-dom";
import { AlbumDetail } from "../../../auth/types/types";
import styles from "./album_preview.module.scss"; // Import the CSS module

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
        setData(response.data[0]); // Điều chỉnh theo cấu trúc dữ liệu API trả về
      } else {
        message.error("Failed to fetch album: No data received");
      }
    } catch (error) {
      message.error("Failed to fetch album");
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
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: 100,
          }}
        >
          {data?.images?.map((image, index) => (
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
      )}
    </div>
  );
};

export default ImagePreview;
