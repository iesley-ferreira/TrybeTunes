import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from '../components/Carregando';
import '../styles/login.css';

class Login extends React.Component {
  state = {
    loading: false,
    disabled: true,
    redirect: false,
  };

  submit = async (event) => {
    event.preventDefault();
    const { user } = this.state;
    this.setState({ loading: true });
    await createUser({ name: user });
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    const min = 3;
    if (value.length < min) {
      this.setState({
        disabled: true,
      });
    } else {
      this.setState({
        disabled: false,
        [name]: value,
      });
    }
  };

  render() {
    const { loading, disabled, redirect } = this.state;
    if (redirect) {
      return (
        <Redirect to="/search" />
      );
    }
    return (
      <div className="fundo-login">
        {
          loading ? <Carregando /> : (
            <div data-testid="page-login" className="page-login">
              <div className="white-box-login">
                <div className="center-login">
                  <div className="logo-login">
                    <h1>
                      Trybe
                    </h1>
                    <h1>
                      Tunes
                    </h1>
                  </div>
                  <div className="login-box">
                    <input
                      className="input-login"
                      type="text"
                      spellCheck="false"
                      data-testid="login-name-input"
                      name="user"
                      placeholder="qual é o seu nome?"
                      onChange={ this.handleChange }
                    />
                    <button
                      className="button-login"
                      type="button"
                      data-testid="login-submit-button"
                      disabled={ disabled }
                      onClick={ this.submit }
                    >
                      Entrar

                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default Login;
