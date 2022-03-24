import { api } from 'boot/axios';
import { ImageItem, FeatureUpdateItem } from 'src/types/types';

const getImages = async(): Promise<ImageItem[]>=> {
  try {
    const res = await api.get('/art-works');
    return res.data;
  } catch(error) {
    console.log(error)
  } return []
}

const updateFeaturedImages = async(featureUpdateImages: FeatureUpdateItem[]) => {
  try {
    const res = await api.put('art-works/featured', {
    featureUpdateImages
    })
    return res
  } catch(error) {
    console.log(error)
  } 
}

export default {
  getImages,
  updateFeaturedImages
}
