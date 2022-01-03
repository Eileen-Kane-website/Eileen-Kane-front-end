export interface ContactState{
  showContact: boolean;
}

function state(): ContactState {
  return {
    showContact: false
  }
};

export default state;
