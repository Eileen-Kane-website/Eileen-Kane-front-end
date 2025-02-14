import { api } from 'boot/axios';
import { Series, ImageItem } from 'src/types/types';

const getSeries = async(): Promise<Series[]> => {
  try {
    const res = await api.get('/eskart/series');
    return res.data;
  } catch(error) {
    console.log(error)
  } return []
}

const addSeries = async(series: string): 
  Promise<Series | string> => {
    const res = await api.post('/eskart/series', {
      series
    })
    if(res.status !== 200) return res.statusText
  return res.data
}

const updateSeries = async(series: Series): 
  Promise<Series | string> => {
    const res = await api.post('/eskart/series/update', {
      series
    })
    if(res.status !== 200) return res.statusText
  return res.data
}

const deleteSeries = async(series: Series, images: ImageItem[]): 
  Promise<{ series: Series, images: ImageItem[] } | string> => {
    const res = await api.delete('/eskart/series', {
      data: {
        series,
        images
      }
    })
    if(res.status !== 200) return res.statusText
  return res.data
}

export default {
  getSeries,
  addSeries,
  updateSeries,
  deleteSeries
}
