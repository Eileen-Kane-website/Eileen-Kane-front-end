import { Module  } from 'vuex';
import { StateInterface } from '../index';
import state, { PortfolioState } from './state';

const portfolioModule: Module<PortfolioState, StateInterface> = {
  namespaced: true,
  state
}

export default portfolioModule;
