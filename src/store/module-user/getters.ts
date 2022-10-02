import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { UserState} from './state';

const getters: GetterTree<UserState, StateInterface> = {
  getCheckUser: (state) => {
    const isUser = state.id;

    if(!isUser || isUser == 0) return false;
    else return true;
  }
};

export default getters;
