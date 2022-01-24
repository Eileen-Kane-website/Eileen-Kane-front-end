export interface ImageItem {
  id: number;
  title: string;
  medium: string;
  dimensions: string;
  year: string;
  path: string;
  isFeatured: boolean;
  seriesId: number; 
}

export interface Series {
  name: string;
  id: number;
}
