import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  render() {
    const { emailUser, currencies } = this.props;
    return (
      <>
        <header>
          <p data-testid="email-field">{emailUser}</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="valueInput">
            Valor:
            <input
              id="valueInput"
              data-testid="value-input"
              name="valueInput"
            />
          </label>
          <label htmlFor="descriptionInput">
            Descrição:
            <input
              id="descriptionInput"
              data-testid="description-input"
              name="descriptionInput"
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
              name="moeda"
              label="moeda"
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
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencies()) });

Wallet.propTypes = {
  emailUser: PropTypes.objectOf(PropTypes.string).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
