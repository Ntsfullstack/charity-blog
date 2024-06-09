import React, { useState, useEffect } from "react";
import {
  Input,
  Form,
  Upload,
  Button,
  message,
  UploadProps,
  UploadFile,
} from "antd";
import ImgCrop from "antd-img-crop";
import style from "./SetInfoPost.module.scss";
import { MyEditorProps } from "../../types/types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPost } from "../../api/auth.api";

const SetInfoPost = (props: MyEditorProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (props?.title) {
      form.setFieldsValue({
        title: props.title.title,
        slug: props.title.slug,
        description: props.title.description,
      });

      // If there's a thumbnail URL, set it to the fileList
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

  const onFinish = async (values: any) => {
    const posts = async () => {
      try {
        const response = await createPost({
          ...values,
          content: localStorage.getItem("htmlContent") || "",
        });
        if (response?.status === 200) {
          localStorage.removeItem("htmlContent");
        } else {
          message.error("Create post failed"); // Thông báo nếu tạo bài viết thất bại
        }
      } catch (error) {
        console.log(error);
      }
    };
    posts();
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  );
};

export default SetInfoPost;
