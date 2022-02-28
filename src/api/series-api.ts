import { api } from 'boot/axios';
import { Series } from 'src/types/types';

const getSeries = async(): Promise<Series[]> => {
  try {
    const res = await api.get('/series');
    return res.data;
  } catch(error) {
    console.log(error)
  } return []
}

export default {
  getSeries
}
