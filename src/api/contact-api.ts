import { api } from 'boot/axios';

interface Email {
  name: string;
  email: string;
  message: string;
  flag: string;
}

const postEmail = async(message: Email) => {
  try {
    const res = await api.post('/email', {
      message
    });
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default {
  postEmail
}
