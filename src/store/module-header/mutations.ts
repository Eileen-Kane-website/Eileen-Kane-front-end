import { MutationTree } from 'vuex';
import { HeaderState } from './state';

const mutation: MutationTree<HeaderState> = {
  toggleShowHeader  (state: HeaderState) {
    state.showHeader = !state.showHeader
  }
};

export default mutation;
