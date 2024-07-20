import React, { useState } from "react";
// import SetInfoPost from "../components/setInfoPost/SetinfoPost";
import MyEditor from "../components/Editor/Editor";
import SetInfoPost from "../components/setInfoPost/SetinfoPost";

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
