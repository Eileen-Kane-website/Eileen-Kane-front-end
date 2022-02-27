import { api } from 'boot/axios';
import { ImageItem } from 'src/types/types';
import process from 'process';

const getImages = async(): Promise<ImageItem[]>=> {
  try {
    const res = await api.get('/art-works');
    return res.data;
  } catch {
    console.log('ERRRRRRRRROR!', process.env)
  } return []
}

export default {
  getImages
}
