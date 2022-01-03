import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ContactState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const contactModule: Module<ContactState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default contactModule;
