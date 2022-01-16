import { ImageItem, Series } from 'src/types/types';
import { images, series } from 'src/data/data';

export interface PortfolioState {
  images: ImageItem[],
  series: Series[]
}

function state(): PortfolioState {
  return {
    images,
    series
  }
};

export default state;
