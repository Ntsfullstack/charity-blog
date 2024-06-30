export interface MyEditorProps {
  page: number;
  setPage: (page: number) => void;
  Post: {
    content?: string | any;
    title?: any;
    thumbnail?: string | any;
    author?: any;
    slug?: any;
    _id?: any;
  };
}

export interface BlogData {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  likes: any;
  author: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  authorId: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface BlogResponse {
  content: BlogData[];
  pagination: {
    current: number | string;
    pageSize: number | string;
    total: number | string;
    pages: number | string;
  };
}
