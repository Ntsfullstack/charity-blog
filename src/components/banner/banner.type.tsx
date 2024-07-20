export interface BannerImage {
    url: string;
    _id: string;
  }
  
 export interface BannerData {
    _id: string;
    images: BannerImage[];
    id: string;
    __v: number;
  }
  