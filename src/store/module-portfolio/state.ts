import { ImageItem, Series } from 'src/types/types';
import { images, series } from 'src/data/data';

export interface PortfolioState {
  images: ImageItem[];
  series: Series[];
  selectedSeries: Series;
}

function state(): PortfolioState {
  return {
    images,
    series,
    selectedSeries: { name: 'All', id: 0 }
  }
};

export default state;
