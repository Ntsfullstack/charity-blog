import React, { useState } from "react";
import { Form, Upload, Modal, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { storage, firestore } from "../../../config/firebase";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  Firestore,
} from "firebase/firestore";
import { updateBanner } from "../api/auth.api";

interface ImageItem {
  url: string;
  path: string;
  uploadedAt: Timestamp;
}

interface SettingProps {}

const Setting: React.FC<SettingProps> = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [url, setUrl] = useState<any[]>([]);
  let banner = [] as any[];

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj)) as string;
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const beforeUpload = (file: any) => {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      message.error(`${file.name} is not a valid image type`, 2);
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handleChange = ({ fileList }: { fileList: any[] }) =>
    setFileList(fileList.filter((file) => file.status !== "error"));

  const onRemove = async (file: any) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
  };

  const handleFinish = async () => {
    try {
      setSubmitting(true);

      const uploadedUrls: string[] = [];

      await Promise.all(
        fileList.map(async (file) => {
          const fileName = `uploads/images/${Date.now()}-${file.name}`;
          const fileRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(fileRef, file.originFileObj);

          // Wait for upload to complete
          const snapshot = await uploadTask;

          // Get download URL
          const downloadUrl = await getDownloadURL(snapshot.ref);

          const item: ImageItem = {
            url: downloadUrl,
            path: fileName,
            uploadedAt: Timestamp.now(),
          };

          uploadedUrls.push(downloadUrl);
          if (fileList.length === uploadedUrls.length) {
            const res = await updateBanner(uploadedUrls);
            if (res) {
              setSubmitting(false);
            }
          }
          await addDoc(collection(firestore, "images"), item);
        })
      );

      setFileList([]);
      message.success(`Images added successfully.`, 2);
    } catch (err) {
      console.error(err);
      message.error(`Error adding images.`, 2);
    } finally {
      setSubmitting(false);
    }
  };
  console.log(url);
  const getBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const tailLayout = {
    wrapperCol: {
      offset: 18,
      span: 12,
    },
  };

  return (
    <div className="mediaFormContainer">
      <div className="header">Upload Images</div>
      <Form onFinish={handleFinish}>
        <div className="uploadContainer">
          <Upload.Dragger
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={onRemove}
            multiple={true}
            maxCount={5}
          >
            <div className="uploadIcon">
              <UploadOutlined />
            </div>
            <div className="uploadText">
              <p>Drag and drop here</p>
              <p>OR</p>
              <p>Click</p>
            </div>
          </Upload.Dragger>
        </div>
        <Form.Item {...tailLayout}>
          <Button shape="round" htmlType="submit" loading={submitting}>
            {submitting ? "Uploading" : "Upload"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Setting;
