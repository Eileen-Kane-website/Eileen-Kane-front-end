import { api } from 'boot/axios';
import { ImageItem, FeatureUpdateItem, NewImage } from 'src/types/types';

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

const uploadImage = async(imageBlob: unknown, imageData: NewImage) => {
  try {
    console.log('api')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const res = await api.post('art-works', {
      imageBlob,
      imageData
    })
    console.log('api-res => ', res)
    return res
  } catch(error) {

  }
}

export default {
  getImages,
  updateFeaturedImages,
  uploadImage
}
