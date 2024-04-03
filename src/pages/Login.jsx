import React from "react";
import { Redirect } from "react-router-dom";
import logo from "../assets/trybeTunes-logo.png";
import SoundWave from "../components/SoundWave";
import { createUser } from "../services/userAPI";
import "./styles/Login.css";

class Login extends React.Component {
  state = {
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
    const { disabled, redirect } = this.state;
    if (redirect) {
      return <Redirect to='/search' />;
    }

    return (
      <div className='fundo-login'>
        <div data-testid='page-login' className='page-login'>
          <div className='white-box-login'>
            <div className='center-login'>
              <div className='logo-login'>
                <div>
                  <img src={logo} alt='TrybeTunes-logo' />
                </div>
                <div>
                  <SoundWave />
                </div>
              </div>
              <form className='login-box'>
                <input
                  className='input-login'
                  type='text'
                  spellCheck='false'
                  data-testid='login-name-input'
                  name='user'
                  placeholder='qual é o seu nome?'
                  onChange={this.handleChange}
                />
                <button
                  className='button-login'
                  type='submit'
                  data-testid='login-submit-button'
                  disabled={disabled}
                  onClick={this.submit}
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
