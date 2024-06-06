import React, { useState } from "react";
import {
  Input,
  Form,
  Upload,
  Button,
  message,
  UploadProps,
  UploadFile,
  GetProp,
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import style from "./SetInfoPost.module.scss";
import { MyEditorProps } from "../../types/types";
import Compressor from "compressorjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetInfoPost = (props: MyEditorProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const [content, setContent] = useState(localStorage.getItem("htmlContent"));
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
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
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
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
          onFinish={onFinish}
          className={style.form}
        >
          <ImgCrop rotationSlider>
            <Upload
              action=""
              listType="picture-card"
              fileList={fileList}
              maxCount={1}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </ImgCrop>

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
