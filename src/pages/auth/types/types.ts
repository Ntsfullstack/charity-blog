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
  categoryId:{
    title: string;
  }
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
  status: number;
  data: BlogData[];
  pagination: {
    current: number | string;
    pageSize: number | string;
    total: number | string;
    pages: number | string;
  };
}

export interface UserData {
  _id: string;
  email: string;
  name: string;
  phone: string | number;
  question: string;
  time : string ;

}


export interface ImageData {
  _id: string;
  title: string;
  images: {
    url : string;
    _id : string;
  };
  total: number ;
}
export interface AlbumInfoData {
  _id: string;
  title: string;
  images: {
    url : string;
    _id : string;

  };
  total: number ;
}


export interface PaginatedResponse {
  status: number;
  data: ImageData[]; // Đảm bảo data là một mảng các đối tượng ImageData
  currentPage: number;
  totalPage: number;
}


export interface UsersResponse {
  status: number
  data: User[]
  currentPage: number
  totalPage: number
}

export interface User {
  _id: string;
  email: string;
  name: string;
  phone: string | number;
  question: string;
  time : string ;
  
  
}
export interface AlbumsDetailResponse {
  status: number
  data: AlbumDetail []
  currentPage: number
  totalPage: number
}

export interface AlbumDetail {
  _id: string
  title: string
  images: Image[]
  __v: number
}

export interface Image {
  id: string
  url: string
  _id: string
}
