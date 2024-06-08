import React from "react";
import { Button, Tooltip } from "antd";
import { EditorState } from "draft-js";

interface ButtonEditorProps {
  title: string;
  editorState: EditorState; // Specify the type
  setEditorState: (newEditorState: EditorState) => void; // Better type for clarity
  setHook: (
    editorState: EditorState,
    setEditorState: (newEditorState: EditorState) => void,
    title?: string
  ) => void;
  icon: React.ReactNode; // Allow for more flexible icon types
  checker: (editorState: EditorState) => boolean;
  Format?: boolean;
}

const ButtonEditor = ({
  title,
  editorState,
  setEditorState,
  setHook,
  icon,
  checker,
  Format,
}: ButtonEditorProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Format
      ? setHook(editorState, setEditorState)
      : setHook(editorState, setEditorState, title);
  };

  return (
    <Tooltip title={title}>
      <Button
        style={{ color: checker(editorState) ? "skyblue" : "black" }}
        onClick={handleClick}
      >
        {icon}
      </Button>
    </Tooltip>
  );
};

export default ButtonEditor;
