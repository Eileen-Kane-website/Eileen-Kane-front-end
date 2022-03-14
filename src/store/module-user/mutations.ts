import { MutationTree } from 'vuex';
import { UserState } from './state';
import { User } from 'src/types/types';

const mutation: MutationTree<UserState> = {
  SET_USER (state: UserState, user: User) {
    state.id = user.id,
    state.email = user.email
  }
};

export default mutation;
