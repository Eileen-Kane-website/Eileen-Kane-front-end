import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PortfolioState } from './state';

const getters: GetterTree<PortfolioState, StateInterface> = {
  getSelectedImages: (state) => (id: number) => {
    const filteredImages = state.images.filter(image => (image.seriesId == id))
    return filteredImages
  }
};

export default getters;
