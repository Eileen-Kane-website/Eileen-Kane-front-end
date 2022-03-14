export interface UserState {
  id: number | null;
  email: string;
}

function state(): UserState {
  return {
    id: null,
    email: ''
  }
};

export default state;
