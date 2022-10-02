export interface UserState {
  id: number | null;
  email: string;
  firstName: string;
  token: string;
}

function state(): UserState {
  return {
    id: null,
    email: '',
    firstName: '',
    token: ''
  }
};

export default state;
