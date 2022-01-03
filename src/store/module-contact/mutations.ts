import { MutationTree } from 'vuex';
import { ContactState } from './state';

const mutation: MutationTree<ContactState> = {
  toggleShowContact  (state: ContactState) {
    state.showContact = !state.showContact
  }
};

export default mutation;
