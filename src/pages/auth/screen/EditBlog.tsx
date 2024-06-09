import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyEditor from "../components/Editor/Editor";
import SetInfoPost from "../components/setInfoPost/SetinfoPost";
import { getBlog } from "../api/auth.api";

interface DataType {
  data: {
    slug: string;
    title: string;
    thumbnail: string;
    author: string;
    content: string;
    description: string;
  }[];
}

const EditBlog = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<DataType[]>([]);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlog(slug as string); // Pass slug as a string directly
        if (res?.data.status === "success") {
          setData(res.data.data); // Assuming API returns an array of DataType
        } else {
          console.error("API response not successful:", res);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    if (slug) {
      // Check if slug is available before fetching
      fetchBlog();
    }
  }, [slug]); 

  return (
    <div>
      <h1>edit Blog</h1>
      <MyEditor page={page} setPage={setPage} content={data}/>
      <SetInfoPost page={page} setPage={setPage} title={data} />
    </div>
  );
};

export default EditBlog;
