import React, { useEffect, useState } from 'react';
import { Upload, message, Image, Modal, Input, Button, Form, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { storage } from '../../../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { uploadImageToAlbum } from '../api/auth.api';
import { toast } from 'react-toastify';
import styles from './AddAlbum.module.scss';

interface AlbumItem {
  url: string;
}

const AddAlbum: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [album, setAlbum] = useState<AlbumItem[]>([]);
  const [title, setTitle] = useState<string>('');

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const customUpload = async (options: any) => {
    const { onSuccess, onError, file } = options;
    
    try {
      const imageId = uuidv4();
      const imageRef = storageRef(storage, `products/${imageId}`);
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      onSuccess({ url: downloadURL });
    } catch (error: any) {
      onError({ error });
      message.error(error.message);
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  useEffect(() => {
    const newAlbum = fileList.map((file) => ({
      url: file.url || file.response?.url,
    })).filter((item): item is AlbumItem => 
      item.url != null 
    );
    
    setAlbum(newAlbum);
  }, [fileList]);

  const uploadToFirebase = async (file: RcFile): Promise<AlbumItem> => {
    const imageId = uuidv4();
    const imageRef = storageRef(storage, `products/${imageId}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { url: downloadURL};
  };

  const handleSubmit = async () => {
    try {
      // Tải lên các file chưa được tải lên Firebase
      const uploadPromises = fileList
        .filter(file => !file.url && !file.response)
        .map(file => uploadToFirebase(file.originFileObj as RcFile));

      const uploadedFiles = await Promise.all(uploadPromises);

      // Kết hợp các file đã tải lên trước đó với các file mới tải lên
      const allFiles = [
        ...album,
        ...uploadedFiles
      ];

      // Gọi API PostToAlbum
      const response = await uploadImageToAlbum({
        title,
        images: allFiles
      });
      if(response.status === 200) {
        toast.success('Album created successfully!');
        setTitle('');
        setFileList([]);
        setAlbum([]);
      } else {
        toast.error('Failed to create album. Please try again.');
      }


     
    } catch (error) {
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
      message.error('Failed to create album. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Card title="Tạo Album Mới" className={styles.card}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="title"
            label="Tiêu đề Album"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề album' }]}
          >
            <Input 
              placeholder="Nhập tiêu đề album"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />
          </Form.Item>
          
          <Form.Item
            name="images"
            label="Hình ảnh"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              customRequest={customUpload}
              onDrop={(event) => {
                event.preventDefault();
              }}
              multiple={true}
              className={styles.uploadContainer}
            >
              <div className={styles.uploadButton}>
                <PlusOutlined />
                <div className={styles.uploadButtonText}>Tải lên</div>
              </div>
            </Upload>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              Tạo Album
            </Button>
          </Form.Item>
        </Form>
      </Card>
      
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default AddAlbum;