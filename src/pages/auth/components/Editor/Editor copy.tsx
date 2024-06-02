import { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import toggleSuperscript from "contenido/dist/utilities/inline/toggleSuperscript";
import isSuperscript from "contenido/dist/utilities/inline/isSuperscript";
import {
  blockStyleFn,
  toggleTextAlign,
  isTextRightAligned,
  isTextCenterAligned,
  isTextLeftAligned,
  isTextJustifyAligned,
  isBlockquote,
  initialStyleMap,
  // toggleParagraph,
  // isParagraph,
  toggleBlockquote,
  Editor,
  isOL,
  isUL,
  toggleOL,
  toggleUL,
  toggleH1,
  isH1,
  isH2,
  isH3,
  isH4,
  isH5,
  isH6,
  toggleH2,
  toggleH3,
  findEntitiesOf,
  addImage,
  isBold,
  toggleBold,
  addLink,
  removeLink,
  createDecorator,
  ImageAttributes,
  isItalic,
  toggleItalic,
  isUnderline,
  toggleUnderline,
  isLineThrough,
  toggleLineThrough,
  toggleOverline,
  isOverline,
  getSelectedBlocksMap,
  toggleH4,
  toggleH5,
  toggleH6,
} from "contenido";
import "contenido/dist/styles.css";
import style from "./Editor.module.scss";
import { Button, Select, Space, Tooltip } from "antd";
// Types
import type { FC } from "react";
import {
  LinkOutlined,
  OrderedListOutlined,
  PictureOutlined,
  UnorderedListOutlined,
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  ColumnWidthOutlined,
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";
import ButtonEditor from "./Button";
import isSubcript from "contenido/dist/utilities/inline/isSub";
import toggleSubscript from "contenido/dist/utilities/inline/toggleSub";

// Custom Types

const EditorImageComponent = (props: any) => {
  if (props.blockType === "image") {
    const { src, alt, ...otherProps } = props as ImageAttributes;
    if (src && alt) return <img alt={alt} src={src} />;
  }

  return <p>Not an image!</p>;
};
const alignmentButtons = [
  {
    title: "text-align-left",
    icon: <AlignLeftOutlined />,
    checker: isTextLeftAligned,
    toggler: toggleTextAlign,
  },
  {
    title: "text-align-center",
    icon: <AlignCenterOutlined />,
    checker: isTextCenterAligned,
    toggler: toggleTextAlign,
  },
  {
    title: "text-align-right",
    icon: <AlignRightOutlined />,
    checker: isTextRightAligned,
    toggler: toggleTextAlign,
  },
  {
    title: "text-align-justify",
    icon: <ColumnWidthOutlined />,
    checker: isTextJustifyAligned,
    toggler: toggleTextAlign,
  },
];

const SubscriptButton = [
  {
    title: "Superscript",
    icon: "Sub",
    checker: isSuperscript,
    toggler: toggleSuperscript,
    Format: true,
  },
  {
    title: "Subscript",
    icon: "Subscript",
    checker: isSubcript,
    toggler: toggleSubscript,
    Format: true,
  },
];

const HeadingButtons = [
  { title: "H1", checker: isH1, toggler: toggleH1 },
  { title: "H2", checker: isH2, toggler: toggleH2 },
  { title: "H3", checker: isH3, toggler: toggleH3 },
  { title: "H4", checker: isH4, toggler: toggleH4 },
  { title: "H5", checker: isH5, toggler: toggleH5 },
  { title: "H6", checker: isH6, toggler: toggleH6 },
];
const textFormattingButtons = [
  {
    title: "Bold",
    setHook: toggleBold,
    icon: <BoldOutlined />,
    checker: isBold,
    Format: true,
  },
  {
    title: "Italic",
    icon: <ItalicOutlined />,
    setHook: toggleItalic,
    checker: isItalic,
    Format: true,
  },
  {
    title: "Underline",
    setHook: toggleUnderline,
    icon: <UnderlineOutlined />,
    checker: isUnderline,
    textFormat: true,
  },
  {
    title: "Line Through",
    setHook: toggleLineThrough,
    icon: <StrikethroughOutlined />,
    checker: isLineThrough,
    Format: true,
  },
  {
    title: "Overline",
    setHook: toggleOverline,
    icon: "O",
    checker: isOverline,
    Format: true,
  }, // Replace with your custom OverlineIcon if available
];

const listAndQuoteButtons = [
  {
    title: "Ordered List",
    Hook: isOL,
    setHook: toggleOL,
    icon: <OrderedListOutlined />,
  },
  {
    title: "Unordered List",
    Hook: isUL,
    setHook: toggleUL,
    icon: <UnorderedListOutlined />,
  },
  {
    title: "Blockquote",
    Hook: isBlockquote,
    setHook: toggleBlockquote,
    icon: <AlignRightOutlined />,
  }, // Use the correct icon for Blockquote
  // { title: "Paragraph", Hook: isParagraph, setHook: toggleParagraph, icon: "P" },
];
// const isParagraph = (editorState: EditorState) => {
//   // Your logic to check if it's a paragraph
//   return true; // Placeholder logic
// };

// const toggleParagraph = (
//   editorState: EditorState,
//   setEditorState: (editorState: EditorState) => void
// ) => {
//   // Your logic to toggle paragraph
//   setEditorState(editorState); // Placeholder logic
// };
const Image = (props: any) => {
  return <img alt={props.alt} src={props.src} />;
};
const MyEditor: FC = () => {
  const decorators = createDecorator([
    {
      component: Image,
      strategy: findEntitiesOf("image"),
    },
  ]);

  const handleAddLink = () => {
    addLink(editorState, setEditorState, {
      href: "https://contenidojs.com",
    });
  };

  const handleRemoveLink = () => removeLink(editorState, setEditorState);
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(decorators)
  );
  const handleAddImage = () => {
    addImage(editorState, setEditorState, {
      alt: "Some alt text.",
      src: "image-src",
      style: { width: "250px", height: "200px" },
    });
  };
  // useEffect(() => {
  //   console.log(getSelectedBlocksMap(editorState));
  // }, [editorState]);
  const handleChangeToggleHeading = (value: string) => {
    switch (value) {
      case "H1":
        toggleH1(editorState, setEditorState);
        break;
      case "H2":
        toggleH2(editorState, setEditorState);
        break;
      case "H3":
        toggleH3(editorState, setEditorState);
        break;
      case "H4":
        toggleH4(editorState, setEditorState);
        break;
      case "H5":
        toggleH5(editorState, setEditorState);
        break;
      case "H6":
        toggleH6(editorState, setEditorState);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Space direction="horizontal" wrap>
        {/* Alignment Buttons */}
        {alignmentButtons.map((button) => (
          <ButtonEditor
            key={button.title}
            title={button.title}
            editorState={editorState}
            setHook={button.toggler}
            setEditorState={setEditorState}
            icon={button.icon}
            checker={button.checker}
          />
        ))}
        {textFormattingButtons.map((button) => (
          <ButtonEditor
            key={button.title}
            title={button.title}
            setHook={button.setHook}
            editorState={editorState}
            setEditorState={setEditorState}
            icon={button.icon}
            checker={button.checker}
            Format={button.Format}
          />
        ))}

        {SubscriptButton.map((button) => (
          <ButtonEditor
            key={button.title}
            title={button.title}
            editorState={editorState}
            setHook={button.toggler}
            setEditorState={setEditorState}
            icon={button.icon}
            checker={button.checker}
          />
        ))}

        {/* Superscript and Subscript buttons can be added here similarly */}
        {/* Image and Link Buttons */}
        <Tooltip title="Add Image">
          <Button icon={<PictureOutlined />} onClick={handleAddImage} />
        </Tooltip>
        <Tooltip title="Add Link">
          <Button icon={<LinkOutlined />} onClick={handleAddLink} />
        </Tooltip>
        <Tooltip title="Remove Link">
          <Button icon={<LinkOutlined />} onClick={handleRemoveLink} />
        </Tooltip>
      </Space>

      {/* Heading Buttons */}
      <Space wrap>
        <Select
          defaultValue="Header"
          style={{
            width: 95,
          }}
          onChange={handleChangeToggleHeading}
          options={HeadingButtons.map((button) => ({
            value: button.title,
            label: button.title,
          }))}
        />
      </Space>

      {/* List Buttons */}
      {/* {listAndQuoteButtons.map((button) => (
        <ButtonEditor
          key={button.title}
          title={button.title}
          Hook={button.Hook}
          setHook={button.setHook}
          editorState={editorState}
          setEditorState={setEditorState}
          name={button.icon}
        />
      ))} */}

      <div className={style.Editor}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Write here..."
          blockStyleFn={blockStyleFn}
          blockRendererFn={EditorImageComponent}
          customStyleMap={initialStyleMap}
        />
      </div>
    </div>
  );
};
export default MyEditor;
