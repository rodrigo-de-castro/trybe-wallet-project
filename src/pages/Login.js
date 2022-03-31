import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  buttonValidation = () => {
    const { email, password } = this.state;
    const val = /\S+@\S+\.\S+/;
    const validationEmail = val.test(email);
    const seis = 6;
    return !(validationEmail && password.length >= seis);
  }

  handleClickSubmit = () => {
    const { email } = this.state;
    const { dispatchLogin, history } = this.props;
    dispatchLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <label htmlFor="emailInput">
          E-mail
          <input
            data-testid="email-input"
            onChange={ this.onInputChange }
            name="email"
            value={ email }
          />
        </label>
        <label htmlFor="emailInput">
          Senha
          <input
            type="password"
            data-testid="password-input"
            onChange={ this.onInputChange }
            name="password"
            value={ password }
          />
        </label>
        <button
          type="button"
          disabled={ this.buttonValidation() }
          onClick={ this.handleClickSubmit }
        >
          Entrar
        </button>
      </div>);
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchLogin: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  dispatchLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
