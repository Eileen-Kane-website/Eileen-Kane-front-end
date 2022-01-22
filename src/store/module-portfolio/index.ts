import { Module  } from 'vuex';
import { StateInterface } from '../index';
import state, { PortfolioState } from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const portfolioModule: Module<PortfolioState, StateInterface> = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

export default portfolioModule;
