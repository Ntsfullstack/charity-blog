import React, { useState, useRef } from "react";
import {
  Input,
  Form,
  Upload,
  Button,
  message,
  UploadFile,
  Progress,
} from "antd";
import ImgCrop from "antd-img-crop";
import { storage, firestore } from "../../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import style from "./Setting.module.scss";
import { useDispatch } from "react-redux";
import { setBannerImages } from "../../../redux-setup/redux";
import { updateBanner } from "../api/auth.api";

type FieldType = {
  image_one: string;
  image_two: string;
  image_three: string;
};

const Setting: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);

  const LinkImage = useRef<HTMLDivElement>(null);

  function copyCode() {
    const codeElement = LinkImage.current;
    if (codeElement) {
      const range = document.createRange();
      range.selectNode(codeElement);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
        message.success("Copied to clipboard", 2);
      } else {
        message.error("Failed to copy: Unable to access the selection", 2);
      }
    } else {
      message.error("Failed to copy: No code element found", 2);
    }
  }

  const handleUpload = async () => {
    try {
      // setUploadingImages(true);
      const newImageUrls: string[] = [];
      const progressArray: number[] = new Array(fileList.length).fill(0);

      const uploadPromises = fileList.map((file, index) => {
        return new Promise<void>((resolve, reject) => {
          const fileName = `images/${Date.now()}-${file.name}`;
          const fileRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(
            fileRef,
            file.originFileObj as any
          );

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              progressArray[index] = progress;
              setUploadProgress([...progressArray]);
            },
            (error) => {
              reject(error);
            },
            async () => {
              try {
                const downloadUrl = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                newImageUrls.push(downloadUrl);
                setUploadedImageUrls((prev) => [...prev, downloadUrl]);
                console.log(`Uploaded file available at: ${downloadUrl}`);
                const item = {
                  url: downloadUrl,
                  path: fileName,
                  uploadedAt: Timestamp.now(),
                };
                await addDoc(collection(firestore, "images"), item);
                resolve();
              } catch (error) {
                reject(error);
              }
            }
          );
        });
      });

      await Promise.all(uploadPromises);

      setFileList([]);
      message.success("Images added successfully.", 2);
    } catch (err) {
      console.error(err);
      message.error("Error adding images.", 2);
    } finally {
      // setUploadingImages(false);
    }
  };

  const beforeUpload = (file: any) => {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      message.error(`${file.name} is not a valid image type`, 2);
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const onChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList.filter((file) => file.status !== "error"));
  };

  const onRemove = (file: UploadFile) => {
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onFinish = async (values: FieldType) => {
    try {
      const imageValues = Object.values(values); // Extract image values
      const response = await updateBanner(imageValues);
      console.log(response);
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={style.Setting}>
      <Form
        form={form}
        className={style.FormLink}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="ảnh 1"
          name="image_one"
          rules={[{ required: true, message: "nhập vào link ảnh" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="ảnh 2"
          name="image_two"
          rules={[{ required: true, message: "nhập vào link ảnh" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="ảnh 3"
          name="image_three"
          rules={[{ required: true, message: "nhập vào link ảnh" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className={style.getLinkImage}>
        <Form
          name="setInfoPost"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className={style.form}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            maxCount={1}
            onChange={onChange}
            onPreview={onPreview}
            onRemove={onRemove}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>

          {fileList.map((file, index) => (
            <div key={file.uid}>
              <Progress percent={Math.round(uploadProgress[index] || 0)} />
            </div>
          ))}

          <Button
            type="primary"
            onClick={handleUpload}
            // loading={uploadingImages}
          >
            Upload Images
          </Button>
        </Form>

        {uploadedImageUrls.length > 0 && (
          <>
            <p>Link ảnh:</p>
            <div className={style.code_snippet}>
              <pre>
                <code ref={LinkImage}>{uploadedImageUrls.join("\n")}</code>
              </pre>
              <button className={style.copy_button} onClick={copyCode}>
                Copy
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Setting;
