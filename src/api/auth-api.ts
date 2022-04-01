/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

interface PreAuthUser {
  email: string;
  password: string;
}

interface NewUser extends PreAuthUser {
  firstName: string;
}

// interface ReturnedUser extends NewUser {
//   token: string;
// }

const postLogin = async(user: PreAuthUser) => {
  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  });
  // const headers = res.headers
  const json: JSON = await res.json();

  if(!res.ok) throw json;
  return json;
}

const postSignup = async(user: NewUser) => {
  const res = await fetch(`${process.env.API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      ...user
    })
  });

  const json: JSON = await res.json();

  if(!res.ok) throw json;
  return json
}

const getVerify = async (token: string) => {
 return await fetch(`${process.env.API_URL}/auth/verify`, {
   credentials: 'include',
   headers: {
     'Authorization': `Bearer ${token}`
   } 
   })
}

export default {
  postLogin,
  postSignup,
  getVerify
}
