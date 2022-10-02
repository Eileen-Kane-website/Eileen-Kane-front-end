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

export interface NewImage {
  title: string;
  medium: string;
  dimensions: string;
  year: string;
  slug: string;
  is_featured: boolean;
  series_id: number | null;
}

export interface UpdateImage {
  id: number;
  old_slug: string;
  title: string;
  medium: string;
  dimensions: string;
  year: string;
  slug: string;
  is_featured: boolean;
  series_id: number | null;
}

export interface FeatureUpdateItem {
  id: number;
  isFeatured: boolean;
} 

export interface DeleteImageItem {
  slug: string,
  id: number,
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
