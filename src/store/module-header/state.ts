export interface HeaderState{
  showHeader: boolean;
  showSeriesSelect: boolean;
}

function state(): HeaderState {
  return {
    showHeader: true,
    showSeriesSelect: false
  }
};

export default state;
