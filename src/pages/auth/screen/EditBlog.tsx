import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyEditor from "../components/Editor/Editor";
import SetInfoPost from "../components/setInfoPost/SetinfoPost";
import { getBlog } from "../api/auth.api";

interface DataType {
  slug: string;
  title: string;
  thumbnail: string;
  author: string;
  content: string;
  description: string;
}

const EditBlog = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<DataType | null>(null); // Adjust state to hold a single DataType object

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlog(slug as string);

        if (res?.status === 200) {
          setData(res.data); // Assuming API returns a single DataType object
        } else {
          console.error("API response not successful:", res);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  return (
    <div>
      <h1>Edit Blog</h1>
      {data ? (
        <>
          <MyEditor page={page} setPage={setPage} content={data.content} />
          <SetInfoPost page={page} setPage={setPage} title={data.title} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditBlog;
