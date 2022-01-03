import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ContactState } from './state';

const getters: GetterTree<ContactState, StateInterface> = {
  someAction (/*context*/) {
    //code here
  }
};

export default getters;
