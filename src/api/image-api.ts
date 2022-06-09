import { api } from 'boot/axios';
import { 
    ImageItem, 
    DeleteImageItem,
    FeatureUpdateItem, 
    NewImage
} from 'src/types/types';

const getImages = async(): Promise<ImageItem[]> => {
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

const uploadImage = async(imageBlob: unknown, imageData: NewImage):
  Promise<ImageItem | string> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const res = await api.post('art-works', {data: {
      imageBlob,
      imageData
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
    if(res.status !== 200) return res.statusText
    console.log('api-res => ', res)
    return res.data
}

const deleteImage = async(images: DeleteImageItem[]) => {
  try {
    const res = await api.delete('art-works', { data: {
      images
    }
    })
    return res.data 
  } catch (error) {
     console.log(error)
  }
}

export default {
  getImages,
  updateFeaturedImages,
  uploadImage,
  deleteImage
}
