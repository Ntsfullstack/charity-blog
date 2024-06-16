// import { Button, Input, Tabs, Form, Popconfirm } from "antd";
// import React, { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import { getComments, getInfoUser, updateInfoUser } from "../api/auth.api";

// const EditUser = () => {
//   const [activeKey, setActiveKey] = useState("1");
//   const [userData, setUserData] = useState<any>(null); // Initialize as null
//   const [commentsData, setCommentsData] = useState<any[]>([]); // Use an array for comments
//   const { id } = useParams(); // Get the user ID from URL params

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (activeKey === "1") {
//           const userData = await getInfoUser(id as string);
//           setUserData(userData.data);
//           form.setFieldsValue({
//             username: userData.data.username,
//             email: userData.data.email,
//           });
//         } else if (activeKey === "2") {
//           const commentsData = await getComments(id); // Pass the user ID for comments
//           setCommentsData(commentsData.data); // Assuming data is in a 'data' property
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [activeKey, id]); // Fetch when activeKey or id changes

//   const onChange = (key: string) => {
//     setActiveKey(key);
//   };

//   const handleUpdateUser = async (values: any) => {
//     try {

//       const response = await updateInfoUser(id ,values);
//       console.log("Update Success:", response.status);
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   const handleDeleteComment = async (commentId: string) => {
//     try {
//       // Delete the comment
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   };
//   const [form] = Form.useForm();
//   return (
//     <Tabs defaultActiveKey={activeKey} onChange={onChange}>
//       <Tabs.TabPane tab="Information" key="1">
//         {userData ? (
//           <Form
//             form={form} // Connect the form instance
//             labelCol={{ span: 4 }}
//             wrapperCol={{ span: 14 }}
//             layout="horizontal"
//             onFinish={handleUpdateUser} // Call handleUpdateUser on submit
//           >
//             <Form.Item label="Name" name="username" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>

//             <Form.Item label="Email" name="email" rules={[{ required: true }]}>
//               <Input />
//             </Form.Item>

//             <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
//               <Button type="primary" htmlType="submit">
//                 Update
//               </Button>
//             </Form.Item>
//           </Form>
//         ) : (
//           <div>Loading user information...</div>
//         )}
//       </Tabs.TabPane>

//       <Tabs.TabPane tab="Comments" key="2">
//         {commentsData.length > 0 ? (
//           <ul>
//             {commentsData.map((comment: any) => (
//               <li key={comment.id}>
//                 {comment.body}
//                 <Popconfirm
//                   title="Are you sure to delete this comment?"
//                   onConfirm={() => handleDeleteComment(comment.id)}
//                   okText="Yes"
//                   cancelText="No"
//                 >
//                   <Button danger size="small" style={{ marginLeft: "10px" }}>
//                     Delete
//                   </Button>
//                 </Popconfirm>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div>Chưa có bình luận nào.</div>
//         )}
//       </Tabs.TabPane>
//     </Tabs>
//   );
// };

// export default EditUser;
