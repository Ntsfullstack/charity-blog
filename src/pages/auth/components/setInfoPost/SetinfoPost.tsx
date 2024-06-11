import React, { useState, useEffect } from "react";
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
import style from "./SetInfoPost.module.scss";
import { MyEditorProps } from "../../types/types";
import { storage, firestore } from "../../../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { createPost } from "../../api/auth.api"; // Import createPost function

const SetInfoPost = (props: MyEditorProps) => {
  const [form] = Form.useForm();
  const [uploadingImages, setUploadingImages] = useState(false);
  const [postingData, setPostingData] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const content = localStorage.getItem("htmlContent");
  const [thumbnail, setThumbnail] = useState<string>("");

  useEffect(() => {
    if (props?.title) {
      form.setFieldsValue({
        title: props.title.title,
        slug: props.title.slug,
        description: props.title.description,
      });
      if (props.title.thumbnail) {
        setFileList([
          {
            uid: "-1",
            name: "thumbnail.png",
            status: "done",
            url: props.title.thumbnail,
          },
        ]);
      }
    }
  }, [props.title, form]);

  const handleUpload = async () => {
    try {
      setUploadingImages(true);
      const newImageUrls: string[] = [];
      const progressArray: number[] = new Array(fileList.length).fill(0);

      const uploadPromises = fileList.map((file, index) => {
        return new Promise((resolve: any, reject) => {
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
                setThumbnail(downloadUrl);
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
      setUploadingImages(false);
    }
  };

  const handlePostSubmit = async () => {
    try {
      setPostingData(true);
      const values = form.getFieldsValue();
      const postData = {
        content,
        slug: values.slug,
        thumbnail,
        description: values.description,
        title: values.title,
      };
      await createPost(postData);
      console.log("Post created successfully");
    } catch (err) {
      console.error(err);
      message.error("Error creating post.", 2);
    } finally {
      setPostingData(false);
    }
  };

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    message.success("Image URL copied to clipboard.", 2);
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

  const handleChangePage = () => {
    props.setPage(1);
  };

  const checkPage = props.page === 2;

  return (
    checkPage && (
      <div className={style.InfoPost}>
        <div className={style.header}>
          <h1>Set Info Post</h1>
          <Button type="link" onClick={handleChangePage}>
            Back
          </Button>
        </div>

        <Form
          form={form}
          name="setInfoPost"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handlePostSubmit}
          className={style.form}
        >
          <ImgCrop rotationSlider>
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
          </ImgCrop>

          {fileList.map((file, index) => (
            <div key={file.uid}>
              <Progress percent={Math.round(uploadProgress[index] || 0)} />
            </div>
          ))}

          <Button
            type="primary"
            onClick={handleUpload}
            loading={uploadingImages}
          >
            Upload Images
          </Button>
        </Form>

        <Form
          form={form}
          name="postInfo"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handlePostSubmit}
          className={style.form}
        >
          <Form.Item
            name="thumbnail"
            label="Thumbnail"
            initialValue={thumbnail}
            rules={[{ required: true }]}
            className={style.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true }]}
            className={style.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true }]}
            className={style.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            className={style.formItem}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            className={style.submitItem}
          >
            <Button type="primary" htmlType="submit" loading={postingData}>
              Submit
            </Button>
          </Form.Item>
        </Form>

        {/* Display uploaded image URLs */}
        <div>
          {thumbnail.length > 0 && (
            <div>
              <h2>Uploaded Images:</h2>
              <ul>
                <li>
                  <a href={thumbnail} target="_blank" rel="noopener noreferrer">
                    {thumbnail}
                  </a>
                  <Button onClick={() => copyImageUrl(thumbnail)}>
                    Copy URL
                  </Button>{" "}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default SetInfoPost;
