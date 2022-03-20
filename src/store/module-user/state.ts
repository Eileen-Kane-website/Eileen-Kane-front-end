export interface UserState {
  id: number | null;
  email: string;
  firstName: string;
}

function state(): UserState {
  return {
    id: null,
    email: '',
    firstName: ''
  }
};

export default state;
