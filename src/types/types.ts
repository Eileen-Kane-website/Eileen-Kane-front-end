export interface ImageItem {
  id: number;
  title: string;
  medium: string;
  dimensions: string;
  year: string;
  slug: string;
  isFeatured: boolean;
  seriesId: number;
  seriesName: string; 
}

export interface Series {
  name: string;
  id: number;
}
