import { api } from 'boot/axios';
import { ImageItem } from 'src/types/types';

const getImages = async(): Promise<ImageItem[]>=> {
  try {
    const res = await api.get('/art-works');
    return res.data;
  } catch {
    console.log('ERRRRRRRRROR!')
  } return []
}

export default {
  getImages
}
