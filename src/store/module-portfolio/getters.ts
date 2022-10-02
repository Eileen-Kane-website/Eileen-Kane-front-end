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
  getImageById: (state) => (id: number) => {
    return state.images.find(image => image.id === id)
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
  getImageIdsByTitle: (state) => (titles: string[], boolean: boolean) => {
    const filteredImages = state.images.filter(image => 
      (titles.includes(image.title)))
    return filteredImages.map(image => ({
      id: image.id,
      isFeatured: boolean
    }))
  },
  getSlugs: (state) => {
    const slugs = state.images.map(image => 
      image.slug)
    return slugs
  },
  getSeriesOptions: (state => {
    const seriesOptions = state.series.map(series => ({
      label: series.name,
      value: series.id
    }))
    return seriesOptions
  }),
  getImageOptions: (state => {
    const imageOptions = state.images.map(image => ({
      label: image.title,
      value: image.id
    }))
    return imageOptions
  })
};

export default getters;
