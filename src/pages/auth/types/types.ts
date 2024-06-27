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
