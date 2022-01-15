import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { HeaderState } from './state';
import actions from './actions';
import mutations from './mutations';

const contactModule: Module<HeaderState, StateInterface> = {
  namespaced: true,
  actions,
  mutations,
  state
};

export default contactModule;
