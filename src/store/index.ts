import { store } from 'quasar/wrappers'
import { InjectionKey } from 'vue'
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex'
import contact from './module-contact';
import { ContactState } from './module-contact/state';
import header from './module-header';
import { HeaderState } from './module-header/state';
import portfolio from './module-portfolio';
import { PortfolioState } from './module-portfolio/state';
import user from './module-user';
import { UserState } from './module-user/state';
import VuexPersistence from 'vuex-persist';
// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  // example: unknown
  contact: ContactState;
  header: HeaderState;
  portfolio: PortfolioState;
  user: UserState;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key')

const vuexLocal = new VuexPersistence ({
  storage: window.localStorage
})

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      contact,
      header,
      portfolio,
      user
    },
    plugins: [vuexLocal.plugin]
    

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    // strict: !!process.env.DEBUGGING
  })

  return Store;
})

export function useStore() {
  return vuexUseStore(storeKey)
}
