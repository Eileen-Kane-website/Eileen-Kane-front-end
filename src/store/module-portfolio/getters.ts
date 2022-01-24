import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PortfolioState } from './state';

const getters: GetterTree<PortfolioState, StateInterface> = {
  getSelectedImages: (state) => (id: number) => {
    console.log('well at least I hit it')
    return state.images.filter((image: { seriesId: number; }) => image.seriesId === id)
  }
};

export default getters;
