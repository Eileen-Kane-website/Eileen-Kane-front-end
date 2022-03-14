import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { UserState } from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const userModule: Module<UserState, StateInterface> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default userModule;
