import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Modal,
  message,
  Image,
  Spin,
  Typography,
  Switch,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SaveOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { getAllImageInAlbum, updateAlbum } from "../api/auth.api";
import { useParams } from "react-router-dom";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../../config/firebase";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const { Title } = Typography;

interface AlbumDetail {
  _id: string;
  title: string;
  images: ImageItem[];
}

interface ImageItem {
  url: string;
  _id: string;
}

const AlbumPage: React.FC = () => {
  const [album, setAlbum] = useState<AlbumDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const { id } = useParams<{ id: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchAlbum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchAlbum = async () => {
    try {
      setLoading(true);
      const response = await getAllImageInAlbum(id!);
      if (response?.data && response.data.length > 0) {
        setAlbum(response.data[0]);
        setNewTitle(response.data[0].title);
      } else {
        message.error("Failed to fetch album: No data received");
      }
    } catch (error) {
      message.error("Failed to fetch album");
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = () => {
    if (!album) return;
    setAlbum({ ...album, title: newTitle });
    setEditingTitle(false);
  };

  const handleImageDelete = (imageId: string) => {
    if (!album) return;
    setAlbum((prevAlbum) => {
      if (!prevAlbum) return null;
      return {
        ...prevAlbum,
        images: prevAlbum.images.filter((img) => img._id !== imageId),
      };
    });
  };

  const handleImageUpload = async (file: File) => {
    if (!album) return;
    try {
      const imageId = uuidv4();
      const imageRef = storageRef(storage, `albums/${album._id}/${imageId}`);
      const snapshot = await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      const newImage: ImageItem = {
        url: downloadURL,
        _id: imageId,
      };

      setAlbum((prevAlbum) => {
        if (!prevAlbum) return null;
        return {
          ...prevAlbum,
          images: [...prevAlbum.images, newImage],
        };
      });
      setUploadModalVisible(false);
      message.success("Image uploaded successfully");
    } catch (error) {
      message.error("Failed to upload image");
    }
  };

  const handleUpdate = async () => {
    if (!album) return;
    try {
      setLoading(true);
      const updatedAlbumData = {
        title: album.title,
        images: album.images.map((img) => ({
          url: img.url,
        })),
      };
      const updatedAlbum = await updateAlbum({
        id: album._id,
        updatedAlbumData,
      });
      if (updatedAlbum?.data) {
        message.success("Album updated successfully");
      } else {
        message.error("Failed to update album");
      }
    } catch (error) {
      message.error("Failed to update album");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (image: ImageItem) => {
    setPreviewImage(image.url);
    setPreviewVisible(true);
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  if (loading || !album) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  return (
    <StyledRow>
      <Col xs={24}>
        <StyledContent>
          <AlbumHeader>
            <TitleWrapper>
              {editingTitle ? (
                <StyledInput
                  value={newTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewTitle(e.target.value)
                  }
                  onPressEnter={handleTitleChange}
                  onBlur={handleTitleChange}
                  autoFocus
                />
              ) : (
                <Title level={2} onClick={() => setEditingTitle(true)}>
                  {album.title} <EditOutlined />
                </Title>
              )}
            </TitleWrapper>
            <ButtonGroup>
              <ViewModeSwitch>
                <Switch
                  checkedChildren={<AppstoreOutlined />}
                  unCheckedChildren={<BarsOutlined />}
                  checked={viewMode === "grid"}
                  onChange={toggleViewMode}
                />
              </ViewModeSwitch>
              <StyledButton
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setUploadModalVisible(true)}
              >
                Thêm ảnh
              </StyledButton>
              <StyledButton
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleUpdate}
              >
                Lưu
              </StyledButton>
            </ButtonGroup>
          </AlbumHeader>
          {viewMode === "grid" ? (
            <ImageGrid>
              {album.images.map((image) => (
                <ImageCard key={image._id}>
                  <ImageContainer onClick={() => handlePreview(image)}>
                    <StyledImage alt={`Ảnh album`} src={image.url} />
                  </ImageContainer>
                  <DeleteButton
                    icon={<DeleteOutlined />}
                    onClick={() => handleImageDelete(image._id)}
                  />
                </ImageCard>
              ))}
            </ImageGrid>
          ) : (
            <ImageList>
              {album.images.map((image) => (
                <ImageListItem key={image._id}>
                  <ImageListThumbnail onClick={() => handlePreview(image)}>
                    <StyledImage alt={`Ảnh album`} src={image.url} />
                  </ImageListThumbnail>
                  <ImageListInfo>
                    <ImageListTitle>Ảnh {image._id}</ImageListTitle>
                    <DeleteButton
                      icon={<DeleteOutlined />}
                      onClick={() => handleImageDelete(image._id)}
                    >
                      Xóa
                    </DeleteButton>
                  </ImageListInfo>
                </ImageListItem>
              ))}
            </ImageList>
          )}
          <StyledModal
            title="Tải ảnh lên"
            open={uploadModalVisible}
            onCancel={() => setUploadModalVisible(false)}
            footer={null}
          >
            <StyledUploadInput
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                e.target.files && handleImageUpload(e.target.files[0])
              }
            />
          </StyledModal>
          <Image
            width={200}
            style={{ display: "none" }}
            src={previewImage}
            preview={{
              visible: previewVisible,
              onVisibleChange: (visible) => setPreviewVisible(visible),
            }}
          />
        </StyledContent>
      </Col>
    </StyledRow>
  );
};

// Styled components
const StyledRow = styled(Row)`
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const StyledContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AlbumHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const TitleWrapper = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }
`;

const StyledInput = styled(Input)`
  font-size: 20px;
  width: 100%;

  @media (min-width: 768px) {
    font-size: 24px;
    width: 300px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (min-width: 768px) {
    gap: 12px;
  }
`;

const StyledButton = styled(Button)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  @media (min-width: 768px) {
    flex: 0 1 auto;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 24px;
  }
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  height: 150px;
  overflow: hidden;
  cursor: pointer;

  @media (min-width: 768px) {
    height: 250px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DeleteButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewModeSwitch = styled.div`
  margin-right: 8px;

  @media (min-width: 768px) {
    margin-right: 16px;
  }
`;

const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ImageListItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const ImageListThumbnail = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ImageListInfo = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const ImageListTitle = styled.h3`
  margin: 0;
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 8px;
  }
`;

const StyledUploadInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
`;

export default AlbumPage;
