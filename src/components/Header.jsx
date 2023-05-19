import React from 'react';
import { NavLink } from 'react-router-dom';
import Carregando from './Carregando';
import { getUser } from '../services/userAPI';
import '../styles/header.css';

class Header extends React.Component {
  state = {
    loading: true,
    userName: '',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      loading: false,
      userName: user.name,
    });
  }

  render() {
    const { loading, userName } = this.state;
    if (loading) return <Carregando />;
    return (
      <header data-testid="header-component" className="header-container">

        <div className="logo-login-header">
          <h1>
            Trybe
            {' '}
            <br />
            Tunes
          </h1>
        </div>

        <ul className="ul-header">
          <li className="li-header">
            <NavLink
              activeClassName="selected"
              to="/search"
              data-testid="link-to-search"
            >
              <i className="fa-sharp fa-solid fa-magnifying-glass" />
              &nbsp;&nbsp;&nbsp;
              Search

            </NavLink>
          </li>
          <li className="li-header">
            <NavLink
              activeClassName="selected"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              <i className="fa-regular fa-star" />
              &nbsp;&nbsp;
              Favoritas

            </NavLink>
          </li>
          <li className="li-header">
            <NavLink
              activeClassName="selected"
              to="/profile"
              data-testid="link-to-profile"
            >
              <i className="fa-regular fa-user" />
              &nbsp;&nbsp;
              Profile

            </NavLink>
          </li>
        </ul>

        <div className="bem-vindo-header">
          <h1 data-testid="header-user-name">
            Bem vindo:
            {' '}
            {userName}
          </h1>
        </div>

      </header>
    );
  }
}

export default Header;
