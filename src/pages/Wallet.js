import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      valueInput: 0,
      descriptionInput: '',
      moeda: '',
      methodInput: '',
      tagInput: '',
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
    const {
      valueInput,
      descriptionInput,
      moeda,
      methodInput,
      tagInput,
    } = this.state;
    const expense = {
      id: expenses.length,
      value: valueInput,
      description: descriptionInput,
      currency: moeda,
      method: methodInput,
      tag: tagInput,
    };
    addExpenses(expense);
    this.setState({
      valueInput: 0,
      descriptionInput: '',
      moeda: '',
      methodInput: '',
      tagInput: '',
    });
  }

  render() {
    const { emailUser, currencies, expenses } = this.props;
    const {
      valueInput,
      descriptionInput,
      moeda,
      methodInput,
      tagInput,
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
          <label htmlFor="descriptionInput">
            Descrição:
            <input
              id="descriptionInput"
              data-testid="description-input"
              name="descriptionInput"
              value={ descriptionInput }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
              name="moeda"
              label="moeda"
              value={ moeda }
              onChange={ this.onInputChange }
            >
              {currencies
                .map((currency) => (<option key={ currency }>{currency}</option>))}
            </select>
          </label>
          <label htmlFor="methodInput">
            Método de Pagamento:
            <select
              id="methodInput"
              data-testid="method-input"
              name="methodInput"
              value={ methodInput }
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
          <button
            type="button"
            onClick={ this.handleClickSubmit }
          >
            Adicionar despesa
          </button>
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
                    <button type="submit">Editar</button>
                    <button type="submit">Excluir</button>
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
});

Wallet.propTypes = {
  emailUser: PropTypes.objectOf(PropTypes.string).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  addExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
