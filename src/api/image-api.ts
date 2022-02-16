// const apiUrl = process.env.API_URL;
import { api } from 'boot/axios';

const getImages = () => {
  try {
    void api.get('/art-works')
      .then((images) => {
        console.log('well?', images)
      })
  } catch {
    console.log('ERRRRRRRRROR!')
  }
}

export default {
  getImages
}
