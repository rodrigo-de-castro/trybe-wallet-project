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
    const { emailUser } = this.props;
    return (
      <header>
        <p data-testid="email-field">{emailUser}</p>
        <p data-testid="total-field">0</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(fetchCurrencies()) });

Wallet.propTypes = {
  emailUser: PropTypes.objectOf(PropTypes.string).isRequired,
  fetchCurrency: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
