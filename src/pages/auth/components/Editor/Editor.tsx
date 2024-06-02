import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw,ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Input } from "antd";
import styles from "./Editor.module.scss";
import { MyEditorProps } from "../../types/types";

const MyEditor = (props: MyEditorProps) => {

  const [editorState, setEditorState] = useState(() => {
    const storedContent = localStorage.getItem("editorState");
    if (storedContent) {
      const contentBlock = htmlToDraft(storedContent);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });

  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContent);
    localStorage.setItem("editorState", htmlContent);
  }, [editorState]); // Lưu mỗi khi editorState thay đổi

  
  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleChangePage = () => {
    const currentContent = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(currentContent));
    localStorage.setItem("htmlContent", htmlContent);
    props.setPage(2);
  };
  const checkPage = props.page === 1 ? true : false;
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
        {/* <h3>HTML Output</h3>
        <Input.TextArea
          className="html-output"
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          rows={8}
          disabled
        /> */}
      </div>
    )
  );
};

export default MyEditor;
