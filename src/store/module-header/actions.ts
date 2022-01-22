import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { HeaderState } from './state';

const actions: ActionTree<HeaderState, StateInterface> = {
  toggleShowHeader(context, payload) {
    context.commit('TOGGLE_SHOW_HEADER', payload)
  },
  setShowSeriesSelect(context, payload) {
    context.commit('SET_SHOW_SERIES_SELECT', payload)
  }
};

export default actions;
