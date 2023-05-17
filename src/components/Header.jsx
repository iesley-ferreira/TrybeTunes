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
      <header data-testid="header-component">

        <div className="logo">
          <img src="" alt="" />
        </div>

        <ul>
          <li>
            <NavLink
              activeClassName="selected"
              to="/search"
              data-testid="link-to-search"
            >
              Search

            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="selected"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favoritas

            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="selected"
              to="/profile"
              data-testid="link-to-profile"
            >
              <p>Search</p>

            </NavLink>
          </li>
        </ul>

        <div className="bem-vindo">
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
