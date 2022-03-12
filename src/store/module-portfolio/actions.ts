import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PortfolioState } from './state'
;
const actions: ActionTree<PortfolioState, StateInterface> = {
  setImages(context, payload) {
    console.log('setImages action!', payload)
    context.commit('SET_IMAGES' , payload)
  },
  setSeries(context, payload) {
    context.commit('SET_SERIES', payload)
  },
  setSelectedSeries(context, payload) {
    context.commit('SET_SELECTED_SERIES', payload)
  },
  resetSelectedSeries(context) {
    console.log('action')
    context.commit('RESET_SELECTED_SERIES')
  }
};

export default actions;
