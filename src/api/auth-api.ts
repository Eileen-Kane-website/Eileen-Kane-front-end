import { api } from 'boot/axios';
import { User } from 'src/types/types';

interface PreAuthUser {
  email: string;
  password: string;
}

const postLogin = async(user: PreAuthUser): Promise<User> => {
  return await api.post('/auth/login', {
    email: user.email,
    password: user.password
  })
}

// const getVerify = async(user: PreAuthUser): Promise<User> => {
//   return await api.get('/auth/verify')
// }

const getVerify = async () => {
 return await api.get('/auth/verify')
}

export default {
  postLogin,
  getVerify
}
