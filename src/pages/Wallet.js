import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, updateExpense, fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = { valueInput: 0,
      dscIpt: '',
      moeda: '',
      methodIpt: '',
      tagInput: '',
      action: 'add',
      currentId: '',
    };
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleClickSubmit = () => {
    const { addExpenses, expenses } = this.props;
    const { valueInput, dscIpt, moeda, methodIpt, tagInput,
    } = this.state;
    const expense = { id: expenses.length,
      value: valueInput,
      description: dscIpt,
      currency: moeda,
      method: methodIpt,
      tag: tagInput,
    };
    addExpenses(expense);
    this.setState(
      { valueInput: 0, dscIpt: '', moeda: '', methodIpt: '', tagInput: '',
      },
    );
  }

  handleClickEdit = () => {
    const { updateExpenses, expenses } = this.props;
    const { valueInput, dscIpt, moeda, methodIpt, tagInput, currentId,
    } = this.state;
    const despesas = expenses;
    despesas.forEach((despesa) => {
      if (despesa.id === currentId) {
        despesa.value = valueInput;
        despesa.description = dscIpt;
        despesa.currency = moeda;
        despesa.method = methodIpt;
        despesa.tag = tagInput;
      }
    });
    updateExpenses(despesas);
    this.setState(
      { valueInput: 0, dscIpt: '', moeda: '', methodIpt: '', tagInput: '', action: 'add',
      },
    );
  }

  deleteExpense = (expenseId) => {
    const { expenses, updateExpenses } = this.props;
    const newState = expenses.filter((expense) => expense.id !== expenseId);
    updateExpenses(newState);
  }

  handleUpdateExpense = (expenseId) => {
    this.setState({ action: 'edit',
      currentId: expenseId,
    });
  }

  render() {
    const { emailUser, currencies, expenses } = this.props;
    const { valueInput, dscIpt, moeda, methodIpt, tagInput, action,
    } = this.state;
    return (
      <>
        <header>
          <p data-testid="email-field">{emailUser}</p>
          <p data-testid="total-field">
            {(expenses.reduce((acc, cur) => acc
            + parseFloat(cur.value) * parseFloat(cur.exchangeRates[cur.currency].ask), 0))
              .toFixed(2)}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="valueInput">
            Valor:
            <input
              id="valueInput"
              data-testid="value-input"
              name="valueInput"
              value={ valueInput }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="dscIpt">
            Descrição:
            <input
              id="dscIpt"
              data-testid="description-input"
              name="dscIpt"
              value={ dscIpt }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
              data-testid="currency-input"
              name="moeda"
              label="moeda"
              value={ moeda }
              onChange={ this.onInputChange }
            >
              {currencies
                .map((currency) => (<option key={ currency }>{currency}</option>))}
            </select>
          </label>
          <label htmlFor="methodIpt">
            Método de Pagamento:
            <select
              id="methodIpt"
              data-testid="method-input"
              name="methodIpt"
              value={ methodIpt }
              onChange={ this.onInputChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tagInput">
            Categoria:
            <select
              id="tagInput"
              data-testid="tag-input"
              name="tagInput"
              value={ tagInput }
              onChange={ this.onInputChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          {action === 'add' ? (
            <button
              type="button"
              onClick={ this.handleClickSubmit }
            >
              Adicionar despesa
            </button>)
            : (
              <button
                type="button"
                onClick={ this.handleClickEdit }
              >
                Editar despesa
              </button>)}
        </form>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .map((expense) => (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{parseFloat(expense.value).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>
                    {parseFloat(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)}
                  </td>
                  <td>
                    {(parseFloat(expense.value)
                    * parseFloat(expense.exchangeRates[expense.currency].ask))
                      .toFixed(2)}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="submit"
                      data-testid="edit-btn"
                      onClick={ () => this.handleUpdateExpense(expense.id) }
                    >
                      Editar
                    </button>
                    <button
                      type="submit"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteExpense(expense.id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>))}
          </tbody>
        </table>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencies()),
  addExpenses: (value) => dispatch(addExpense(value)),
  updateExpenses: (value) => dispatch(updateExpense(value)),
});
Wallet.propTypes = {
  emailUser: PropTypes.objectOf(PropTypes.string).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  updateExpenses: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
