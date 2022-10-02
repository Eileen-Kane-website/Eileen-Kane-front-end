import { ImageItem, Series } from 'src/types/types';
import { MutationTree } from 'vuex';
import { PortfolioState } from './state';

const mutation: MutationTree<PortfolioState> = {
  SET_IMAGES (state: PortfolioState, images: ImageItem[]) {
    state.images = images
  },
  SET_SERIES (state: PortfolioState, series: Series[]) {
    state.series = series
  },
  SET_SELECTED_SERIES (state: PortfolioState, series: Series) {
    state.selectedSeries = series
  },
  RESET_SELECTED_SERIES (state: PortfolioState) {
    state.selectedSeries = { name: 'Forms of Protest', id: 3 }
  },
  REMOVE_DELETED_IMAGES (state: PortfolioState, images: ImageItem[]) {
    const deletedIds = images.map(img => img.id)
    state.images = state.images.filter(image => (
      !deletedIds.includes(image.id)
    ))
  },
  ADD_IMAGE (state: PortfolioState, image: ImageItem) {
    state.images = [...state.images, image]
  },
  SET_UPDATED_IMAGE (state: PortfolioState, image: ImageItem) {
    state.images = state.images.map(img => (img.id === image.id
      ? image
      : img
    ))
  },
  ADD_SERIES (state: PortfolioState, series: Series) {
    state.series = [...state.series, series]
  },
  SET_UPDATED_SERIES (state: PortfolioState, series: Series) {
    console.log('MUTATION => ', series)
    const seriesId = series.id
    state.series = state.series.map(ser => (
      ser.id === seriesId
        ? series
        : ser
    ))
  },
  REMOVE_SERIES (state: PortfolioState, seriesId: number) {
    console.log('mutation => ', seriesId)
    state.series = state.series.filter(series => series.id !== seriesId)
  }
};

export default mutation;
