// import React, { useState, useEffect } from 'react';
// import { Layout, Card, Input, Button, Modal, message, Spin, Image } from 'antd';
// import { EditOutlined, DeleteOutlined, PlusOutlined, SaveFilled } from '@ant-design/icons';
// import { getAllImageInAlbum, updateAlbum } from '../api/auth.api';
// import { useParams } from 'react-router-dom';
// import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
// import { storage } from '../../../config/firebase';
// import { v4 as uuidv4 } from 'uuid';
// import { title } from 'process';

// const { Content } = Layout;

// interface AlbumDetail {
//   _id: string;
//   title: string;
//   images: ImageItem[];
//   __v: number;
// }

// interface ImageItem {
//   id: string;
//   url: string;
//   _id: string;
// }

// const AlbumPage: React.FC = () => {
//   const [album, setAlbum] = useState<AlbumDetail | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editingTitle, setEditingTitle] = useState(false);
//   const [newTitle, setNewTitle] = useState('');
//   const [uploadModalVisible, setUploadModalVisible] = useState(false);
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewImage, setPreviewImage] = useState('');
//   const { id } = useParams<{ id: string }>();

//   useEffect(() => {
//     fetchAlbum();
//   }, [id]);

//   const fetchAlbum = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllImageInAlbum(id!);
//       if (response?.data && response.data.length > 0) {
//         setAlbum(response.data[0]);
//         setNewTitle(response.data[0].title);
//       } else {
//         message.error('Failed to fetch album: No data received');
//       }
//     } catch (error) {
//       message.error('Failed to fetch album');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleTitleChange = async () => {
//     if (!album) return;

//     try {
//       // Here you should implement the API call to update the album title
//       // For now, we'll just update the local state
//       setAlbum({ ...album, title: newTitle });
//       setEditingTitle(false);
//       message.success('Album title updated successfully');
//     } catch (error) {
//       message.error('Failed to update album title');
//     }
//   };

//   const handleImageDelete = async (imageId: string) => {
//     if (!album) return;
//     try {
//       // Here you should implement the API call to delete the image
//       // For now, we'll just update the local state
//       setAlbum({
//         ...album,
//         images: album.images.filter(img => img.id !== imageId)
//       });
//       message.success('Image deleted successfully');
//     } catch (error) {
//       message.error('Failed to delete image');
//     }
//   };

//   const handleImageUpload = async (file: File) => {
//     if (!album) return;
//     try {
//       const imageId = uuidv4();
//       const imageRef = storageRef(storage, `albums/${album._id}/${imageId}`);
//       const snapshot = await uploadBytes(imageRef, file);
//       const downloadURL = await getDownloadURL(snapshot.ref);

//       const newImage: ImageItem = {
//         id: imageId,
//         url: downloadURL,
//         _id: imageId,
//       };

//       setAlbum({
//         ...album,
//         images: [...album.images, newImage]
//       });
//       setUploadModalVisible(false);
//       message.success('Image uploaded successfully');
//     } catch (error) {
//       message.error('Failed to upload image');
//     }
//   };
//   const handleUpdate =async ()=>{
//     if (!album) return;
//     try {
//       const updatedAlbum = await updateAlbum(album._id,  newTitle  , album);
//       if (updatedAlbum?.data) {
//         setAlbum(updatedAlbum.data);
//         setEditingTitle(false);
//         message.success('Album updated successfully');
//       } else {
//         message.error('Failed to update album');
//       }
//     } catch (error) {
//       message.error('Failed to update album');
//     }
//   }

//   if (loading) {
//     return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />;
//   }

//   if (!album) {
//     return <div>No album found</div>;
//   }

//   const albumImagesStyle: React.CSSProperties = {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
//     gap: '16px',
//     padding: '16px',
//   };

//   const imageContainerStyle: React.CSSProperties = {
//     position: 'relative',
//     width: '100%',
//     paddingBottom: '100%',
//     overflow: 'hidden',
//   };

//   const imageStyle: React.CSSProperties = {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//   };

//   return (
//     <Layout className="album-page-layout">
//       <Content className="album-page-content">
//         <div className="album-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//           {editingTitle ? (
//             <Input
//               value={newTitle}
//               onChange={(e) => setNewTitle(e.target.value)}
//               onPressEnter={handleTitleChange}
//               onBlur={handleTitleChange}
//               autoFocus
//             />
//           ) : (
//             <h1 onClick={() => setEditingTitle(true)} style={{ cursor: 'pointer' }}>
//               {album.title} <EditOutlined />
//             </h1>
//           )}
//           <div>
//           <Button type="primary" icon={<PlusOutlined />} onClick={() => setUploadModalVisible(true)}>
//             Add Image
//           </Button>

//           <Button type="primary" icon={<SaveFilled />} onClick={() => handleUpdate()} >
//             Save
//           </Button>
//           </div>
          
//         </div>
//         <div className="album-images" style={albumImagesStyle}>
//           {album.images.map((image) => (
//             <Card
//               key={image.id}
//               hoverable
//               style={{ width: '100%' }}
//               cover={
//                 <div 
//                   className="image-container"
//                   style={imageContainerStyle}
//                   onClick={() => {
//                     setPreviewImage(image.url);
//                     setPreviewVisible(true);
//                   }}
//                 >
//                   <img
//                     alt={`Image ${image.id}`}
//                     src={image.url}
//                     style={imageStyle}
//                   />
//                 </div>
//               }
//               actions={[
//                 <DeleteOutlined key="delete" onClick={() => handleImageDelete(image.id)} />
//               ]}
//             />
//           ))}
//         </div>
//         <Modal
//           title="Upload Image"
//           visible={uploadModalVisible}
//           onCancel={() => setUploadModalVisible(false)}
//           footer={null}
//         >
//           <input type="file" onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])} />
//         </Modal>
//         <Image
//           width={200}
//           style={{ display: 'none' }}
//           src={previewImage}
//           preview={{
//             visible: previewVisible,
//             onVisibleChange: (visible) => setPreviewVisible(visible),
//           }}
//         />
//       </Content>
//     </Layout>
//   );
// };

// export default AlbumPage;