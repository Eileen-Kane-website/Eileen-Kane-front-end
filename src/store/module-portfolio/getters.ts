import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { PortfolioState } from './state';

const getters: GetterTree<PortfolioState, StateInterface> = {
  getSelectedImages: (state) => (id: number) => {
    const filteredImages = state.images.filter(image => (image.seriesId == id))
    return filteredImages
  },
  getAllImages: (state) => {
    return state.images.sort((a, b) => (
      a.title.localeCompare(b.title)))
  },
  getFeaturedImages: (state) => {
    const featuredImages = state.images.filter(image => 
      image.isFeatured)
    return featuredImages
  },
  getFeaturePreview: (state) => (featuredNames: string[]) => {
    const previewImages = state.images.filter(image => 
      featuredNames.includes(image.title))
    return previewImages
  },
  getImageIdsByTitle: (state) => (titles: string[]) => {
    const filteredImages = state.images.filter(image => 
      (titles.includes(image.title)))
    return filteredImages.map(image => image.id)
  }
};

export default getters;
