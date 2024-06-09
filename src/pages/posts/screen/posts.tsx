import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../../auth/api/auth.api";

const Post = () => {
  const [data, setData] = useState<any>([]);
  const { slug } = useParams();
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlog(slug as string);
        if (res?.status === 200) {
          setData(res.data);    
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, []);

  return <></>;
};

export default Post;
