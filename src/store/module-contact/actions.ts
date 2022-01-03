import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ContactState } from './state';

const actions: ActionTree<ContactState, StateInterface> = {
  toggleShowContact (context) {
    console.log('hit the action')
    context.commit('toggleShowContact')

  }
};

export default actions;
