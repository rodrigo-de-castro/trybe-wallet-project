// Coloque aqui suas actions
export function loginAction(value) {
  return { type: 'LOGIN', value };
}

function getCurrencies(json) {
  const keys = Object.keys(json);
  const currencies = keys
    .filter((currency) => currency !== 'USDT');
  return { type: 'GET_CURRENCIES', payload: currencies };
}

function requestCurrencies() {
  return { type: 'REQUEST_CURRENCIES' };
}

function failedRequest(error) {
  return { type: 'FAILED_REQUEST', payload: error };
}

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => dispatch(getCurrencies(json)))
      .catch((error) => dispatch(failedRequest(error)));
  };
}

export function addNewExpense(exchangeRates, value) {
  const obj = { ...value, exchangeRates };
  return { type: 'ADD_EXPENSE', payload: obj };
}

export function addExpense(value) {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((exchangeRates) => dispatch(addNewExpense(exchangeRates, value)))
      .catch((error) => dispatch(failedRequest(error)));
  };
}
