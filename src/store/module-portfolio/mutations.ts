import { Series } from 'src/types/types';
import { MutationTree } from 'vuex';
import { PortfolioState } from './state';

const mutation: MutationTree<PortfolioState> = {
  SET_SELECTED_SERIES (state: PortfolioState, series: Series) {
    state.selectedSeries = series
  },
  RESET_SELECTED_SERIES (state: PortfolioState) {
    console.log('mutation')
    state.selectedSeries = { name: 'All', id: 0 }
  }
};

export default mutation;
