import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { HeaderState } from './state';

const actions: ActionTree<HeaderState, StateInterface> = {
  toggleShowHeader(context) {
    context.commit('toggleShowHeader')
  }
};

export default actions;
