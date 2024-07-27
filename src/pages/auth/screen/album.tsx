import React, { useEffect, useState } from "react";
import { Button, PaginationProps, Popconfirm, Table } from "antd";
import { getAllAlbum } from "../api/auth.api";
import { ImageData } from "../types/types";
import { useNavigate } from "react-router-dom";

const Album: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await getAllAlbum(
          pagination.current || 1,
          pagination.pageSize || 10
        );

        if (response.status === 200) {
          setImages(response.data);
          setPagination((prev) => ({
            ...prev,
            total: response.totalPage * (pagination.pageSize || 10),
            current: response.currentPage,
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

  const handleEditImage = (id: string) => {
    navigate(`/auth/album-page/${id}`);
  };

  const handleDeleteImage = (id: string) => {
    // Implement delete functionality
    console.log("Delete image with id:", id);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "40%",
    },
    {
      title: "Count",
      dataIndex: "total",
      key: "images",
      width: "10%",
    },
    
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (record: ImageData) => (
        <>
          <Button onClick={() => handleEditImage(record._id)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa ảnh này?"
            onConfirm={() => handleDeleteImage(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
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
          rowKey={(record: ImageData) => record._id}
        />
      )}
    </div>
  );
};

export default Album;