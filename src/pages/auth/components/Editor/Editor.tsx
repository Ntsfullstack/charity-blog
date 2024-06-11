import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "antd";
import styles from "./Editor.module.scss";
import { MyEditorProps } from "../../types/types";

const MyEditor = (props: MyEditorProps) => {
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
        />
        <div>
          <Button onClick={handleChangePage}>Next</Button>
        </div>
      </div>
    )
  );
};

export default MyEditor;
