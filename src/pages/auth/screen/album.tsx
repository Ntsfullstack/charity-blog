import React, { useState, useEffect } from "react";
import { Button, PaginationProps, Popconfirm, Table } from "antd";
import { deleteImageInAlbum, getAllImageInAlbum } from "../api/auth.api";
import PaginatedResponse from "../types/type";
interface ImageData {
  _id: string; // Assuming MongoDB's ObjectId for unique identifiers
  images: string; // Assuming a URL string for the image
}

const Album: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const handleDeleteImage = async (id: string) => {
    try {
      await deleteImageInAlbum(id);
      setImages((prevImages) => prevImages.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await getAllImageInAlbum(
          pagination?.current || 1,
          pagination?.pageSize || 10
        );
        if (response.data.status === 200) {
          const dataAlbum: ImageData[] = response.data.data;
          setImages(dataAlbum);
          setPagination((prev) => ({
            ...prev,
            total: response.data.totalImages,
            current: response.data.currentPage,
          }));
        } else {
          setError("Lỗi khi lấy dữ liệu album");
        }
      } catch (error) {
        setError("Lỗi khi gọi API");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (newPagination: PaginationProps) => {
    setPagination(newPagination);
  };

  const columns = [
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (image: string) => <img src={image} alt="Ảnh" width="100" />,
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_: any, record: ImageData) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa ảnh này?"
          onConfirm={() => {
            handleDeleteImage(record._id);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Table
          dataSource={images}
          columns={columns}
          pagination={pagination}
          onChange={handleTableChange}
          rowKey={(record) => record._id}
        />
      )}
    </div>
  );
};

export default Album;
