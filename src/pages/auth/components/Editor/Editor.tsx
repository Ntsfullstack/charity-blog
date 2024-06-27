import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "antd";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"; // Import necessary functions from Firebase Storage
import { storage } from "../../../../config/firebase"; // Adjust the path based on your folder structure
import styles from "./Editor.module.scss";


const MyEditor = (props: any) => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    if (props.content) {
      const contentBlock = htmlToDraft(props.content);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }

    const initialContent = localStorage.getItem("htmlContent");
    if (initialContent) {
      const contentBlock = htmlToDraft(initialContent);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    }

    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (props.content) {
      const contentBlock = htmlToDraft(props.content);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      const storedContent = localStorage.getItem("htmlContent");
      if (storedContent) {
        const contentBlock = htmlToDraft(storedContent);
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        setEditorState(EditorState.createWithContent(contentState));
      }
    }
  }, [props.content]);

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleChangePage = () => {
    const currentContent = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(currentContent));
    localStorage.setItem("htmlContent", htmlContent);
    props.setPage(2);
  };

  const uploadImageCallBack = (file: any) => {
    return new Promise((resolve, reject) => {
      // Create a reference to the file location in Firebase Storage
      const storageRef = ref(storage, `images/${file.name}`);
      // Upload the file and monitor the progress
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Monitor the upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle upload errors
          reject(error);
        },
        () => {
          // Get the download URL once the upload is complete
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({ data: { url: downloadURL } });
          });
        }
      );
    });
  };

  const checkPage = props.page === 1;

  return (
    checkPage && (
      <div className={styles.myEditor}>
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          placeholder="Nhập nội dung của bạn tại đây..."
          toolbarClassName={styles.myEditor__toolbar}
          wrapperClassName={styles.myEditor__wrapper}
          editorClassName={styles.myEditor__editor}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            blockType: { inDropdown: true },
            colorPicker: { inDropdown: true },
            image: {
              previewImage: true,
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: true },
            },
          }}
        ></Editor>
        <div>
          <Button onClick={handleChangePage}>Next</Button>
        </div>
      </div>
    )
  );
};

export default MyEditor;
