// Coloque aqui suas actions
export function loginAction(value) {
  return { type: 'LOGIN', value };
}
export const addExpense = (value) => ({ type: 'ADD_EXPENSE', data: value });
