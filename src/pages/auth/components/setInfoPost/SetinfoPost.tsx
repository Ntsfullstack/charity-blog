import React, { useState, useEffect } from "react";
import { Input, Form, Upload, Button, message, UploadFile, Select } from "antd";
import { RcFile, UploadProps } from "antd/lib/upload";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../config/firebase";
import { createPost, getTagCategory, updatePost } from "../../api/auth.api";
import style from "./SetInfoPost.module.scss";
import { toast } from "react-toastify";
import { RollbackOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from 'uuid';

interface ItemProps {
  label: string;
  value: string;
}



const SetInfoPost = (props: any) => {
  const [form] = Form.useForm();
  const [postingData, setPostingData] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const content = localStorage.getItem("htmlContent");
  const [urlImage, setUrlImage] = useState<string>("");
  const [options, setOptions] = useState<ItemProps[]>([]);
  const [categoryValue, setCategoryValue] = useState<string>("");
  console.log(props.title)
  useEffect(() => {
    if (props?.title) {
      form.setFieldsValue({
        title: props.title?.title  ?? "",
        slug: props.title?.slug  ?? "",
        description: props?.title?.description ?? ""
        ,
        category: props?.title?.category ?? "",
      });

      if (props.title?.thumbnail) {
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: props.title?.thumbnail,
          },
        ]);
        setUrlImage(props.title?.thumbnail);
      }
      setCategoryValue(props.title?.category);
    }
  }, [props.title, form]);

  const handleCategoryChange = (value: string) => {
    setCategoryValue(value);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadToFirebase = async (file: RcFile): Promise<string> => {
    const imageId = uuidv4();
    const imageRef = storageRef(storage, `products/${imageId}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const handlePostSubmit = async (values: any) => {
    setPostingData(true);
    try {
      let imageUrl = urlImage;

      // If there's a new file, upload it to Firebase
      if (fileList.length > 0 && fileList[0].originFileObj) {
        imageUrl = await uploadToFirebase(fileList[0].originFileObj as RcFile);
      }

      const postData = {
        ...values,
        thumbnail: imageUrl,
        content: content || "",
        categoryId: categoryValue,
      };

      if (props?.title) {
        await updatePost( postData);
        toast.success("Post updated successfully!");
      } else {
        await createPost(postData);
        toast.success("Post created successfully!");
      }
      form.resetFields();
      setFileList([]);
      setUrlImage("");
      setCategoryValue("");
    } catch (error) {
      console.error("Error submitting post:", error);
      toast.error("Failed to submit post. Please try again.");
    } finally {
      setPostingData(false);
    }
  };

  const handleChangePage = () => {
    props.setPage(1);
  };

  const checkPage = props.page === 2;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getTagCategory();
        if (!response || !response.data) return;

        const categories: ItemProps[] = response.data.map((category: any) => ({
          label: category.title,
          value: category._id,
        }));

        setOptions(categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    checkPage && (
      <div className={style.infoPost}>
        <div className={style.header}>
          <Button type="link" onClick={handleChangePage} className={style.backButton}>
            <RollbackOutlined />
          </Button>
          <h1 className={style.title}>Thông tin bài viết</h1>
        </div>

        <div className={style.content}>
          <Form
            form={form}
            name="setInfoPost"
            onFinish={handlePostSubmit}
            className={style.uploadForm}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              maxCount={1}
              className={style.uploader}
              beforeUpload={() => false} // Prevent auto upload
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>

            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please input the title!" }]}
              className={style.formItem}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="slug"
              label="Slug"
              rules={[{ required: true, message: "Please input the slug!" }]}
              className={style.formItem}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please input the description!" }]}
              className={style.formItem}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="categoryId"
              label="Thể loại bài viết"
              rules={[{ required: true, message: "Please select a category!" }]}
              className={style.formItem}
            >
              <Select
                style={{ width: '100%' }}
                placeholder="Select a category"
                onChange={handleCategoryChange}
                options={options}
                value={categoryValue}
              />
            </Form.Item>

            <Form.Item className={style.submitItem}>
              <Button
                type="primary"
                htmlType="submit"
                loading={postingData}
                disabled={fileList.length === 0 || !categoryValue}
                className={style.submitButton}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  );
};

export default SetInfoPost;