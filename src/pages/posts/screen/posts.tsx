import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../../auth/api/auth.api";
import { Typography } from "antd";
import dayjs from "dayjs";
import styles from "./Posts.module.scss";
import Loading from "../../../components/Loading/Loading";
import Rate from "../../../components/Rate/Rate";

const { Text } = Typography;

interface BlogPost {
  title: string;
  content: string;
  thumbnail: string;
  authorId: {
    _id: string;
    username: string;
  };
  createdAt: string;
  slug: string;
}

const Post: React.FC = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlog(slug as string);
        if (res?.status === 200) {
          setPost(res.data);
        } else {
          setError("Blog post not found");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("An error occurred while fetching the blog post.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className={styles.blogContainer}>
      <div className={styles.header}>
        <h1 className={styles.Title}>{post.title}</h1>
        <div className={styles.metaData}>
          <Text type="secondary">
            By{" "}
            <a href={`${post.authorId._id}`} className={styles.Link}>
              {post.authorId.username}
            </a>
          </Text>
          <Text type="secondary">
            {dayjs(post.createdAt).format("MMMM D, YYYY")}
          </Text>
        </div>
      </div>
      <img src={post.thumbnail} alt={post.title} className={styles.thumbnail} />
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className={styles.rate}>
        <p>
          <Text type="secondary">Rate this post:</Text>
        </p>
        <Rate></Rate>
      </div>
    </div>
  );
};

export default Post;
