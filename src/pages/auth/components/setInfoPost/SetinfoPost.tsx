import React, { useState } from "react";
import { Input, Form, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import style from "./SetInfoPost.module.scss";
import { MyEditorProps } from "../../types/types";
import Compressor from "compressorjs";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";








interface UserPostResponse {
  success: boolean;
  message: string;
  error : string;
}









const SetInfoPost = (props: MyEditorProps) => {
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [content, setContent] = useState(localStorage.getItem("htmlContent"));



  const onFinish = async (values: any) => {
    const data = {
      ...values,
      Content: content,
    };

    try {
      const response = await fetch("your_api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        localStorage.removeItem("htmlContent");
        toast.success("Create post successfully"); 
      } else {
        message.error("Create post failed"); // Thông báo nếu tạo bài viết thất bại
        toast.error("Create post failed");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while creating the post"); // Thông báo lỗi
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = (info: any) => {
    const checkNumberImage = beforeUpload(info.file);
    if (checkNumberImage) {
      return;
    }
    if (info.file.status === "uploading") {
      new Compressor(info.file.originFileObj, {
        quality: 0.6,
        maxWidth: 800,
        maxHeight: 600,
        success(result) {
          const compressedFile = new File([result], info.file.name, {
            type: result.type,
          });

          const formData = new FormData();
          formData.append("Thumbnail", compressedFile);

          fetch("your_upload_api", {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              setFileList([
                {
                  uid: info.file.uid, // Giữ nguyên uid để Ant Design nhận diện
                  name: info.file.name,
                  status: "done",
                  url: data.url,
                },
              ]);
              form.setFieldsValue({ Thumbnail: data.url });
              message.success(`${info.file.name} file uploaded successfully`);
            })
            .catch(() => {
              message.error(`${info.file.name} file upload failed.`);
            });
        },
        error(err) {
          console.error(err.message);
        },
      });
    }
  };

  const beforeUpload = (file: any) => {
    if (fileList.length > 1) {
      message.error("Bạn chỉ có thể tải lên một ảnh duy nhất.");
      return Upload.LIST_IGNORE;
    }
    setFileList([file]);
    return true;
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
          onFinish={onFinish}
          className={style.form}
        >
          {/* <Form.Item
            name="Thumbnail"
            label="Thumbnail"
            className={style.uploadItem}
          >
            <ImgCrop rotationSlider>
              <Upload
                action="" // Thay bằng API thực tế của bạn
                listType="picture-card"
                onPreview={handlePreview}
                onChange={handleChange}
                className={style.upload}
              >
                <div className={style.uploadButton}>
                  <UploadOutlined />
                  <div className="ant-upload-text">Upload</div>
                </div>
              </Upload>
            </ImgCrop>
          </Form.Item> */}

          <Form.Item
            name="Title"
            label="Title"
            rules={[{ required: true }]}
            className={style.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Slug"
            label="Slug"
            rules={[{ required: true }]}
            className={style.formItem}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Description"
            label="Description"
            className={style.formItem}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            className={style.submitItem}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  );
};

export default SetInfoPost;
