import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Upload } from "antd";
import React, { useState } from "react";
import { firestore, storage } from "../../../config/firebase";

import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

interface ImageItem {
  url: string;
  path: string;
  uploadedAt: Timestamp;
}

interface SettingProps {}

const AddAlbum: React.FC<SettingProps> = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [uploadUrls, setUploadUrls] = useState<string[]>([]);

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

  const handleChange = async ({
    file,
    fileList,
  }: {
    file: any;
    fileList: any[];
  }) => {
    if (file.status === "done") {
      const fileName = `uploads/images/${Date.now()}-${file.name}`;
      const fileRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(fileRef, file.originFileObj);

      const snapshot = await uploadTask;
      const downloadUrl = await getDownloadURL(snapshot.ref);

      setUploadUrls((prevUrls) => [...prevUrls, downloadUrl]);
    }
    setFileList(fileList.filter((file) => file.status !== "error"));
  };

  const onRemove = async (file: any) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    setUploadUrls((prevUrls) =>
      prevUrls.filter((url, index) => fileList[index].uid !== file.uid)
    );
  };
  const submit = () => {
    console.log(title);
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

          const snapshot = await uploadTask;

          const downloadUrl = await getDownloadURL(snapshot.ref);

          const item: ImageItem = {
            url: downloadUrl,
            path: fileName,
            uploadedAt: Timestamp.now(),
          };

          uploadedUrls.push(downloadUrl);

          console.log("Uploaded URLs:", uploadedUrls);
          await addDoc(collection(firestore, "images"), item);
        })
      );
      setUploadUrls(uploadedUrls);

      setFileList([]);
      message.success(`Images added successfully.`, 2);
    } catch (err) {
      console.error(err);
      message.error(`Error adding images.`, 2);
    } finally {
      setSubmitting(false);
    }
  };

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
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>

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
          <Button
            shape="round"
            htmlType="submit"
            loading={submitting}
            onClick={submit}
          >
            {submitting ? "Uploading" : "Upload"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddAlbum;
