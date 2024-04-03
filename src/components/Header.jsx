/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUser } from "../services/userAPI";
import "./styles/header.css";
import logo from "/public/logo-small.png";

const Header = () => {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      setUserName(user.name);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <header data-testid='header-component' className='header-container'>
      <div className='header__content'>
        <div className='sidebar__logo'>
          <img className='section__logo' src={logo} alt='TrybeTunes-logo' />
        </div>

        <ul className='ul-header'>
          <li className='li-header'>
            <NavLink activeClassName='selected' to='/search' data-testid='link-to-search'>
              <i className='fa-sharp fa-solid fa-magnifying-glass' />
              &nbsp;&nbsp;&nbsp; Search
            </NavLink>
          </li>
          <li className='li-header'>
            <NavLink
              activeClassName='selected'
              to='/favorites'
              data-testid='link-to-favorites'
            >
              <i className='fa-regular fa-star' />
              &nbsp;&nbsp; Favorites
            </NavLink>
          </li>
          <li className='li-header'>
            <NavLink
              activeClassName='selected'
              to='/profile'
              data-testid='link-to-profile'
            >
              <i className='fa-regular fa-user' />
              &nbsp;&nbsp; Profile
            </NavLink>
          </li>
        </ul>

        <div className='bem-vindo-header'>
          <h1 data-testid='header-user-name'>Welcome: {userName}</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
