import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { PortfolioState } from './state';

const actions: ActionTree<PortfolioState, StateInterface> = {
  setImages(context, payload) {
    context.commit('SET_IMAGES' , payload)
  },
  setSeries(context, payload) {
    context.commit('SET_SERIES', payload)
  },
  setSelectedSeries(context, payload) {
    context.commit('SET_SELECTED_SERIES', payload)
  },
  resetSelectedSeries(context) {
    context.commit('RESET_SELECTED_SERIES')
  },
  removeDeletedImages(context, payload) {
    context.commit('REMOVE_DELETED_IMAGES', payload)
  },
  addImage(context, payload) {
    context.commit('ADD_IMAGE', payload)
  },
  addSeries(context, payload) {
    context.commit('ADD_SERIES', payload)
  },
  setUpdatedSeries(context, payload) {
    context.commit('SET_UPDATED_SERIES', payload)
  },
  removeSeries(context, payload) {
    context.commit('REMOVE_SERIES', payload)
  }
};

export default actions;
