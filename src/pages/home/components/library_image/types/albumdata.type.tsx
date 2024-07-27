type Album = {
    _id: string;
    title: string;
    images: {
      url: string;
      _id: string;
    }[];
    __v: number;
  };
  
  type AlbumCollection = Album[];