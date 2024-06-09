export type BlogPostData = {
  thumbnail: string;
  title: string;
  description: string;
  authorId: { _id: string; username: string };
  createdAt: string;
  slug: string;
  id: string;
};
