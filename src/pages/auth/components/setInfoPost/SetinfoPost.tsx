// import React, { useState, useEffect } from "react";
// import { Input, Form, Upload, Button, message, UploadFile, Select } from "antd";
// import { storage, firestore } from "../../../../config/firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import { createPost, getTagCategory, updatePost } from "../../api/auth.api";
// import style from "./SetInfoPost.module.scss";
// import type { SelectProps } from "antd";
// import { toast } from "react-toastify";
// import { LeftOutlined, RollbackOutlined } from "@ant-design/icons";

// const SetInfoPost = (props: any) => {
//   const [form] = Form.useForm();
//   const [postingData, setPostingData] = useState(false);
//   const [fileList, setFileList] = useState<UploadFile[]>([]);
//   const content = localStorage.getItem("htmlContent");
//   const [urlImage, setUrlImage] = useState<string>("");
//   const [categories, setCategories] = useState<any>();
//   const [options, setOptions] = useState<ItemProps[]>([]);
//   const [value, setValue] = useState<any>([]);

//   useEffect(() => {
//     if (props?.title) {
//       form.setFieldsValue({
//         title: props.title.post.title,
//         slug: props.title.post.slug,
//         description: props.title.post.description,
//         thumbnail: props.title.post.thumbnail,
//       });

//       if (props.title.post.thumbnail) {
//         setFileList([
//           {
//             uid: "-1",
//             name: "thumbnail.png",
//             status: "done",
//             url: props.title.post.thumbnail,
//           },
//         ]);
//         setUrlImage(props.title.post.thumbnail);
//       }
//     }
//   }, [props.title, form]);

//   const handleChange = (value: any) => {
//     setValue(value);
//   };
//   const handleUpload = async (file: UploadFile) => {
//     try {
//       const fileName = `images/${Date.now()}-${file.name}`;
//       const fileRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(
//         fileRef,
//         file.originFileObj as any
//       );

//       uploadTask.on(
//         "state_changed",
//         null,
//         (error) => {
//           message.error("Upload failed.", 2);
//           console.error(error);
//         },
//         async () => {
//           const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
//           setUrlImage(downloadUrl);
//           const item = {
//             url: downloadUrl,
//             path: fileName,
//             uploadedAt: Timestamp.now(),
//           };
//           await addDoc(collection(firestore, "images"), item);
//           message.success("Image uploaded successfully.", 2);
//         }
//       );
//     } catch (err) {
//       console.error(err);
//       message.error("Error uploading image.", 2);
//     }
//   };

//   const handlePostSubmit = async () => {
//     if (!urlImage) {
//       message.error("Vui lòng tải lên một hình ảnh đầu tiên.", 2);
//       return;
//     }
//     if (categories?.length === 0) {
//       message.error("Vui lòng chọn thể loại ");
//       return;
//     }

//     try {
//       setPostingData(true);
//       const values = form.getFieldsValue();
//       const postData = {
//         content,
//         slug: values.slug,
//         description: values.description,
//         title: values.title,
//         thumbnail: urlImage,
//         category: value,
//       };

//       let res;
//       if (props?.title) {
//         res = await updatePost(postData);
//       } else {
//         res = await createPost(postData);
//       }
//       if (res.status === 200) {
//         toast.success(res?.message);
//       } else {
//         toast.error(res?.message || "Something went wrong.");
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setPostingData(false);
//     }
//   };

//   const beforeUpload = (file: any) => {
//     if (!["image/jpeg", "image/png"].includes(file.type)) {
//       message.error(`${file.name} is not a valid image type`, 2);
//       return Upload.LIST_IGNORE;
//     }
//     return false;
//   };

//   const onChange = async ({ fileList }: { fileList: UploadFile[] }) => {
//     setFileList(fileList.filter((file) => file.status !== "error"));
//     const latestFile = fileList[fileList.length - 1];
//     if (latestFile) {
//       await handleUpload(latestFile);
//     }
//   };

//   const onRemove = (file: UploadFile) => {
//     setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
//   };

//   const onPreview = async (file: UploadFile) => {
//     let src = file.url as string;
//     if (!src) {
//       src = await new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj as File);
//         reader.onload = () => resolve(reader.result as string);
//       });
//     }
//     const image = new Image();
//     image.src = src;
//     const imgWindow = window.open(src);
//     imgWindow?.document.write(image.outerHTML);
//   };

//   interface ItemProps {
//     label: string;
//     value: string;
//   }
//   const handleChangePage = () => {
//     props.setPage(1);
//   };

//   const checkPage = props.page === 2;

//   useEffect(() => {
//     if (props.title?.dataCategory) {
//       setCategories(props.title.dataCategory);
//     }
//   }, [props.title]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await getTagCategory();
//         if (!response || !response.data) return;

//         const categories: ItemProps[] = response.data.map((category: any) => ({
//           label: category.title,
//           value: category._id,
//         }));

//         setOptions(categories);
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);
//   return (
//     checkPage && (
//       <div className={style.InfoPost}>
//         <div className={style.header}>
//           <Button type="link" onClick={handleChangePage}>
//             <RollbackOutlined />
//           </Button>
//           <h1>Thông tin bài viết</h1>
//         </div>

//         <Form
//           form={form}
//           name="setInfoPost"
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//           onFinish={handlePostSubmit}
//           className={style.UploadFile}
//         >
//           <Upload
//             listType="picture-card"
//             fileList={fileList}
//             beforeUpload={beforeUpload}
//             maxCount={1}
//             onChange={onChange}
//             onPreview={onPreview}
//             onRemove={onRemove}
//           >
//             {fileList.length < 1 && "+ Upload"}
//           </Upload>
//         </Form>

//         <Form
//           form={form}
//           name="postInfo"
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 16 }}
//           onFinish={handlePostSubmit}
//           className={style.form}
//         >
//           <Form.Item
//             name="title"
//             label="Title"
//             rules={[{ required: true }]}
//             className={style.formItem}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="slug"
//             label="Slug"
//             rules={[{ required: true }]}
//             className={style.formItem}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="description"
//             label="Description"
//             className={style.formItem}
//             rules={[{ required: true }]}
//           >
//             <Input.TextArea rows={4} />
//           </Form.Item>
//           <div className={style.formItem}>
//             <span>*Thể loại bài viết : </span>
//             <Select
//               defaultValue={
//                 props.title?.categories[0]._id || "chọn thể loại bài viết"
//               }
//               style={{ width: 160 }}
//               onChange={handleChange}
//               options={options}
//               allowClear
//               aria-required
//             />
//           </div>

//           <Form.Item
//             wrapperCol={{ offset: 8, span: 16 }}
//             className={style.submitItem}
//           >
//             <Button
//               type="primary"
//               htmlType="submit"
//               loading={postingData}
//               disabled={!urlImage}
//             >
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     )
//   );
// };

// export default SetInfoPost;
