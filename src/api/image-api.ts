import { api } from 'boot/axios';
import { ImageItem } from 'src/types/types';

const getImages = async(): Promise<ImageItem[]>=> {
  try {
    console.log('ENV ====>>>', process.env.API_URL)
    const res = await api.get('/art-works');
    return res.data;
  } catch {
    console.log('ERRRRRRRRROR!', process.env.API_URL)
  } return []
}

export default {
  getImages
}
