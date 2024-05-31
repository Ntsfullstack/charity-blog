import { convertToRaw, EditorState } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import style from "./Editor.module.scss";

export default function MyEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState<string>("");

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const plainText = newEditorState.getCurrentContent().getPlainText("\u0001");
    setText(plainText);
  };

  

  return (
    <>
      <div style={{ height: "80px", overflow: "auto" }}>{text}</div>
      <Editor
        editorState={editorState}
        toolbarClassName={style.toolbarClassName}
        wrapperClassName={style.wrapperClassName}
        editorClassName={style.editorClassName}
        onEditorStateChange={onEditorStateChange}
        
      />
    </>
  );
}
