import { Series } from 'src/types/types';
import { MutationTree } from 'vuex';
import { PortfolioState } from './state';

const mutation: MutationTree<PortfolioState> = {
  setSelectedSeries  (state: PortfolioState, series: Series) {
    state.selectedSeries = series
  }
};

export default mutation;
