import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PortfolioState } from './state'
;
const actions: ActionTree<PortfolioState, StateInterface> = {
  setSelectedSeries(context, payload) {
    context.commit('setSelectedSeries', payload)
  }
};

export default actions;
