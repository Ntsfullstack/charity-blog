import React, { useState, useEffect } from 'react';
import { Layout, Card, Input, Button, Modal, message, Image } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { getAllImageInAlbum, updateAlbum } from '../api/auth.api';
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { storage } from '../../../config/firebase';
import { v4 as uuidv4 } from 'uuid';

const { Content } = Layout;

interface AlbumDetail {
  _id: string;
  title: string;
  images: ImageItem[];
}

interface ImageItem {
  url: string;
  _id: string;
}

const AlbumPage: React.FC = () => {
  const [album, setAlbum] = useState<AlbumDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchAlbum();
  }, [id]);

  const fetchAlbum = async () => {
    try {
      setLoading(true);
      const response = await getAllImageInAlbum(id!);
      if (response?.data && response.data.length > 0) {
        setAlbum(response.data[0]);
        setNewTitle(response.data[0].title);
      } else {
        message.error('Failed to fetch album: No data received');
      }
    } catch (error) {
      message.error('Failed to fetch album');
    } finally {
      setLoading(false);
    }
  };
  
  const handleTitleChange = () => {
    if (!album) return;
    setAlbum({ ...album, title: newTitle });
    setEditingTitle(false);
  };

  const handleImageDelete = (imageId: string) => {
    if (!album) return;
    setAlbum(prevAlbum => {
      if (!prevAlbum) return null;
      return {
        ...prevAlbum,
        images: prevAlbum.images.filter(img => img._id !== imageId)
      };
    });
  };

  const handleImageUpload = async (file: File) => {
    if (!album) return;
    try {
      const imageId = uuidv4();
      const imageRef = storageRef(storage, `albums/${album._id}/${imageId}`);
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const newImage: ImageItem = {
        url: downloadURL,
        _id: imageId,
      };

      setAlbum(prevAlbum => {
        if (!prevAlbum) return null;
        return {
          ...prevAlbum,
          images: [...prevAlbum.images, newImage]
        };
      });
      setUploadModalVisible(false);
      message.success('Image uploaded successfully');
    } catch (error) {
      message.error('Failed to upload image');
    }
  };

  const handleUpdate = async () => {
    if (!album) return;
    try {
      setLoading(true);
      const updatedAlbumData = {
        title: album.title,
        images: album.images.map(img => ({
          url: img.url,
        }))
      };
      const updatedAlbum = await updateAlbum({ id: album._id, updatedAlbumData });
      if (updatedAlbum?.data) {
        message.success('Album updated successfully');
      } else {
        message.error('Failed to update album');
      }
    } catch (error) {
      message.error('Failed to update album');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (image: ImageItem) => {
    setPreviewImage(image.url);
    setPreviewVisible(true);
  };

  if (loading || !album) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className="album-page-layout">
      <Content className="album-page-content">
        <div className="album-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          {editingTitle ? (
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onPressEnter={handleTitleChange}
              onBlur={handleTitleChange}
              autoFocus
            />
          ) : (
            <h1 onClick={() => setEditingTitle(true)} style={{ cursor: 'pointer' }}>
              {album.title} <EditOutlined />
            </h1>
          )}
          <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setUploadModalVisible(true)}>
              Add Image
            </Button>
            <Button type="primary" icon={<SaveOutlined />} onClick={handleUpdate} style={{ marginLeft: '10px' }}>
              Save
            </Button>
          </div>
        </div>
        <div className="album-images" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {album.images.map((image) => (
            <Card
              key={image._id}
              hoverable
              style={{ width: '100%' }}
              cover={
                <div 
                  className="image-container"
                  style={{ height: '200px', overflow: 'hidden' }}
                  onClick={() => handlePreview(image)}
                >
                  <img
                    alt={`Image ${image._id}`}
                    src={image.url}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              }
              actions={[
                <DeleteOutlined key="delete" onClick={() => handleImageDelete(image._id)} />
              ]}
            />
          ))}
        </div>
        <Modal
          title="Upload Image"
          open={uploadModalVisible}
          onCancel={() => setUploadModalVisible(false)}
          footer={null}
        >
          <input type="file" onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])} />
        </Modal>
        <Image
          width={200}
          style={{ display: 'none' }}
          src={previewImage}
          preview={{
            visible: previewVisible,
            onVisibleChange: (visible) => setPreviewVisible(visible),
          }}
        />
      </Content>
    </Layout>
  );
};

export default AlbumPage; 