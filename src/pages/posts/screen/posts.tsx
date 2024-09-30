import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog } from "../../auth/api/auth.api";
import { Typography } from "antd";
import dayjs from "dayjs";
import styles from "./Posts.module.scss";
import Loading from "../../../components/Loading/Loading";
import Rate from "../../../components/Rate/Rate";
import RelatedArticles from "../../home/components/news/news";
// import RelatedArticles from "../../../relatedArticles/relatedArticles";

const { Text } = Typography;

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  slug: string;
}

const Post: React.FC = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<any>();
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlog(slug as string);
        if (res?.status === 200) {
          setPost(res.data);
          console.log(res.relatedPosts);
          // setRelatedArticles(res.relatedPosts);
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
            By <p className={styles.Link}>Admin</p>
          </Text>
          <Text
            type="secondary"
            style={{ fontSize: "0.9rem", color: "#6c757d" }}
          >
            {dayjs(post.createdAt).format("MMMM D, YYYY")}
          </Text>
        </div>
      </div>
      <img src={post.thumbnail} alt={post.title} className={styles.thumbnail} />
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
        style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#333" }} // Cập nhật kích thước và màu chữ
      ></div>
      <div className={styles.rate} style={{ marginTop: "1.5rem" }}>
        <p>
          <Text type="secondary" style={{ fontSize: "1rem" }}>
            Rate this post:
          </Text>
        </p>
        <Rate></Rate>
      </div>
      <RelatedArticles
        currentArticleId={relatedArticles}
        outstanding
      ></RelatedArticles>
    </div>
  );
};

export default Post;
