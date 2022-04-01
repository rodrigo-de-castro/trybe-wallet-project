// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return { ...state, isFetching: true };
  case 'GET_CURRENCIES':
    return { ...state, isFetching: false, currencies: action.payload };
  default:
    return state;
  }
}

export default wallet;
