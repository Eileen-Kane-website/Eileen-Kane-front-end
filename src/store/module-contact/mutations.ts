import { MutationTree } from 'vuex';
import { ContactState } from './state';

const mutation: MutationTree<ContactState> = {
  toggleShowContact  (state: ContactState) {
    console.log('hit the mutation')
    state.showContact = !state.showContact
  }
};

export default mutation;
