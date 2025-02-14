import { api } from 'boot/axios';

interface Email {
  name: string;
  email: string;
  message: string;
  flag: string;
}

const postEmail = async(message: Email) => {
  try {
    console.log('whats the nmessage => ', message)
    const res = await api.post('/mail', {
      ...message
    });
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default {
  postEmail
}
