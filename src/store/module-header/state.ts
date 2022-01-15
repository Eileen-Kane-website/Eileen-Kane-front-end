export interface HeaderState{
  showHeader: boolean;
}

function state(): HeaderState {
  return {
    showHeader: true
  }
};

export default state;
