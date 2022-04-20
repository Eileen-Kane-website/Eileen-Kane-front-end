import { ImageItem, Series } from 'src/types/types';
import { MutationTree } from 'vuex';
import { PortfolioState } from './state';

const mutation: MutationTree<PortfolioState> = {
  SET_IMAGES (state: PortfolioState, images: ImageItem[]) {
    state.images = images
  },
  SET_SERIES (state: PortfolioState, series: Series[]) {
    state.series = series
  },
  SET_SELECTED_SERIES (state: PortfolioState, series: Series) {
    state.selectedSeries = series
  },
  RESET_SELECTED_SERIES (state: PortfolioState) {
    state.selectedSeries = { name: 'Forms of Protest', id: 3 }
  }
};

export default mutation;
