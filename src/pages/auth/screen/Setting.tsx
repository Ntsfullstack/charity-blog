import React, { useEffect, useState } from 'react';
import { Upload, message, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { storage } from '../../../config/firebase';
import { v4 as uuidv4 } from 'uuid';
import { updateBanner } from '../api/auth.api';
import { toast } from 'react-toastify';
import styles from './Setting.module.scss';

interface ImageBanner {
  url: string;
}

const Setting: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [album, setAlbum] = useState<ImageBanner[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

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

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const customUpload = async (options: any) => {
    const { onSuccess, onError, file } = options;

    try {
      const imageId = uuidv4();
      const imageRef = storageRef(storage, `products/${imageId}`);
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      file.url = downloadURL; // Update the file with the download URL
      onSuccess({ url: downloadURL, id: imageId });
    } catch (error: any) {
      onError({ error });
      message.error(error.message);
    }
  };

  useEffect(() => {
    const newAlbum = fileList.map((file) => ({
      url: file.url || file.response?.url,
    })).filter((item): item is ImageBanner => item.url != null);

    setAlbum(newAlbum);
  }, [fileList]);

  const uploadToFirebase = async (file: RcFile): Promise<ImageBanner> => {
    const imageId = uuidv4();
    const imageRef = storageRef(storage, `products/${imageId}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { url: downloadURL };
  };

  const handleCancel = () => setPreviewOpen(false);

  const handleSubmit = async () => {
    try {
      const uploadPromises = fileList
        .filter(file => !file.url && !file.response)
        .map(file => uploadToFirebase(file.originFileObj as RcFile));

      const uploadedFiles = await Promise.all(uploadPromises);

      const allFiles = [
        ...uploadedFiles,
        ...album
      ];

      const response = await updateBanner({
        images: allFiles
      });

      if(response?.status === 200) {
        toast.success('Album created successfully!');
        setFileList([]);
        setAlbum([]);
      } else {
        toast.error('Failed to create album. Please try again.');
      }
    } catch (error) {
      message.error('Failed to create album. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className={styles.imageUploadContainer}>
      <h2 className={styles.title}>Image Upload</h2>
      <div className={styles.uploadWrapper}>
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
          className={styles.uploadArea}
        >
          <div className={styles.uploadButton}>
            <PlusOutlined className={styles.uploadIcon} />
            <div className={styles.uploadText}>Upload</div>
          </div>
        </Upload>
      </div>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      <Button onClick={handleSubmit} className={styles.submitButton}>
        Submit
      </Button>
    </div>
  );
};

export default Setting;
