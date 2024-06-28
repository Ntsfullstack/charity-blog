import React, { useState, useEffect } from "react";
import { Input, Form, Upload, Button, message, UploadFile, Select } from "antd";
import { storage, firestore } from "../../../../config/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { createPost, getTagCategory, updatePost } from "../../api/auth.api";
import style from "./SetInfoPost.module.scss";
import { MyEditorProps } from "../../types/types";
// import TagsCategory from "../TagCategory/tagCategory";
import type { SelectProps } from "antd";
import { toast } from "react-toastify";
import { Toast } from "react-toastify/dist/components";

const SetInfoPost = (props: any) => {
  const [form] = Form.useForm();
  const [postingData, setPostingData] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const content = localStorage.getItem("htmlContent");
  const [urlImage, setUrlImage] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [options, setOptions] = useState<ItemProps[]>([]);
  const [value, setValue] = useState<any>([]);

  useEffect(() => {
    if (props?.title) {
      form.setFieldsValue({
        title: props.title.Post.title,
        slug: props.title.Post.slug,
        description: props.title.Post.description,
        thumbnail: props.title.Post.thumbnail,
      });
      if (props.title.Post.thumbnail) {
        setFileList([
          {
            uid: "-1",
            name: "thumbnail.png",
            status: "done",
            url: props.title.Post.thumbnail,
          },
        ]);
        setUrlImage(props.title.Post.thumbnail);
      }
    }
  }, [props.title, form]);

  const handleUpload = async (file: UploadFile) => {
    try {
      const fileName = `images/${Date.now()}-${file.name}`;
      const fileRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(
        fileRef,
        file.originFileObj as any
      );

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          message.error("Upload failed.", 2);
          console.error(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setUrlImage(downloadUrl);
          const item = {
            url: downloadUrl,
            path: fileName,
            uploadedAt: Timestamp.now(),
          };
          await addDoc(collection(firestore, "images"), item);
          message.success("Image uploaded successfully.", 2);
        }
      );
    } catch (err) {
      console.error(err);
      message.error("Error uploading image.", 2);
    }
  };

  const handlePostSubmit = async () => {
    if (!urlImage) {
      message.error("Please upload an image first.", 2);
      return;
    }

    try {
      setPostingData(true);
      const values = form.getFieldsValue();
      const postData = {
        content,
        slug: values.slug,
        description: values.description,
        title: values.title,
        thumbnail: urlImage,
        category: value,
      };
      if (props?.title) {
        await updatePost(postData);
      } else {
        await createPost(postData);
      }
      toast.success("Post created successfully.");
    } catch (err) {
      console.error(err);
      message.error("Error creating post.", 2);
    } finally {
      setPostingData(false);
    }
  };

  const beforeUpload = (file: any) => {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      message.error(`${file.name} is not a valid image type`, 2);
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const onChange = async ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList.filter((file) => file.status !== "error"));
    const latestFile = fileList[fileList.length - 1];
    if (latestFile) {
      await handleUpload(latestFile);
    }
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

  interface ItemProps {
    label: string;
    value: string;
  }
  const notify = () => toast("Wow so easy!");
  const handleChangePage = () => {
    props.setPage(1);
  };

  const checkPage = props.page === 2;

  useEffect(() => {
    if (props.title?.dataCategory) {
      setCategories(props.title.dataCategory);
    }
  }, [props.title]);

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

  const sharedProps: SelectProps = {
    mode: "multiple",
    style: { width: "100%" },
    options,
    placeholder: "Select Item...",
    maxTagCount: "responsive",
  };

  useEffect(() => {
    const datas = categories.map((category: any) => ({
      // label: category.title,
      value: category._id,
    }));
    setValue(datas);
  }, [categories]);

  const selectProps: SelectProps = {
    value,
    onChange: setValue,
  };
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
          <Select {...sharedProps} {...selectProps} />
          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
            className={style.submitItem}
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={postingData}
              disabled={!urlImage}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  );
};

export default SetInfoPost;
