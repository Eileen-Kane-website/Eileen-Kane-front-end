import { MutationTree } from 'vuex';
import { HeaderState } from './state';

const mutation: MutationTree<HeaderState> = {
  TOGGLE_SHOW_HEADER (state: HeaderState, payload: boolean) {
    state.showHeader = payload
  },
  SET_SHOW_SERIES_SELECT (state: HeaderState, payload: boolean) {
    state.showSeriesSelect = payload
  }
};

export default mutation;
