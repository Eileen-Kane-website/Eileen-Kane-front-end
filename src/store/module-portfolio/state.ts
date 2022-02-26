import { ImageItem, Series } from 'src/types/types';

export interface PortfolioState {
  images: ImageItem[];
  series: Series[];
  selectedSeries: Series;
}

function state(): PortfolioState {
  return {
    images: [],
    series: [],
    selectedSeries: { name: 'Charcoal', id: 1 }
  }
};

export default state;
