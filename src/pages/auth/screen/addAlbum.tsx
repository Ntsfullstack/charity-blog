import React, { useEffect, useState } from 'react';
import { Upload, message, Image, Modal, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { storage } from '../../../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { uploadImageToAlbum } from '../api/auth.api';
import { toast } from 'react-toastify';
// import { PostToAlbum } from '../../../api/auth.api';

interface AlbumItem {
  url: string;
  id: string;
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
      
      onSuccess({ url: downloadURL, id: imageId });
    } catch (error: any) {
      onError({ error });
      message.error(error.message);
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  useEffect(() => {
    const newAlbum = fileList.map((file) => ({
      url: file.url || file.response?.url,
      id: file.uid || file.response?.id,
    })).filter((item): item is AlbumItem => 
      item.url != null && item.id != null 
    );
    
    setAlbum(newAlbum);
  }, [fileList]);

  const uploadToFirebase = async (file: RcFile): Promise<AlbumItem> => {
    const imageId = uuidv4();
    const imageRef = storageRef(storage, `products/${imageId}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { url: downloadURL, id: imageId };
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
    <>
      <Input 
        placeholder="Enter album title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
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
      >
        <button style={{ border: 0, background: 'none' }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};

export default AddAlbum;