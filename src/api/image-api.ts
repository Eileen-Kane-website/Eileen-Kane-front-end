/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { api } from 'boot/axios';
import { 
    ImageItem, 
    DeleteImageItem,
    FeatureUpdateItem, 
    NewImage,
    UpdateImage
} from 'src/types/types';

const getImages = async(): Promise<ImageItem[]> => {
  try {
    const res = await api.get('eskart/art-works');
    return res.data;
  } catch(error) {
    console.log(error)
  } return []
}

const updateFeaturedImages = async(featureUpdateImages: FeatureUpdateItem[]) => {
  try {
    const res = await api.put('eskart/art-works/featured', {
    featureUpdateImages
    })
    return res
  } catch(error) {
    console.log(error)
  } 
}

// const uploadImage = async(imageBlob: unknown, imageData: NewImage):
//   Promise<ImageItem | string> => {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     const res = await api.post('art-works', {data: {
//       imageBlob,
//       imageData
//     },
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*'
//     }
//   })
//     if(res.status !== 200) return res.statusText
//     console.log('api-res => ', res)
//     return res.data
// }

const uploadImage = async(imageBlob: unknown, imageData: NewImage):
  Promise<ImageItem | string> => {
    const res = await fetch(`${process.env.API_URL}/eskart/art-works`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        imageBlob,
        imageData
      })
    })
    const json = await res.json();
  if(!res.ok) throw json;
  return json;
  }

const updateImage = async(image: UpdateImage): Promise<ImageItem | void> => {
  try {
    const res = await api.put(`eskart/art-works/${image.id}`, {data: {
      image
    }
  })
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const deleteImage = async(images: DeleteImageItem[]) => {
  try {
    const res = await api.delete('eskart/art-works', { data: {
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
  updateImage,
  deleteImage
}
