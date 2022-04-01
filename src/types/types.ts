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

export interface FeatureUpdateItem {
  id: number;
  isFeatured: boolean;
} 

export interface Series {
  name: string;
  id: number;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  token: string;
}
