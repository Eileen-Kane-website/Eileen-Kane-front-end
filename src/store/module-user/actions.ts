import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserState } from './state';

const actions: ActionTree<UserState, StateInterface> = {
  setUser(context, payload) {
    console.log('SET USER ====> ', payload)
    context.commit('SET_USER', payload)
  }
};

export default actions;
