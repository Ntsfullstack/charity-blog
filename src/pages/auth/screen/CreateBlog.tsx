import React, { useState } from "react";
import SetInfoPost from "../components/setInfoPost/SetinfoPost";
import MyEditor from "../components/Editor/Editor";

const CreateBlog = () => {
  const [page, setPage] = useState(1);

  return (
    <div>
      <h1>Create Blog</h1>
      <MyEditor page={page} setPage={setPage} />
      <SetInfoPost page={page} setPage={setPage} />
    </div>
  );
};

export default CreateBlog;
