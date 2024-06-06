import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './assets/medialogo.svg'


function Header() {
  return (
    <div className="header-container">
      <div className="header-logo"><img src={Logo} id='logo'></img></div>
      <Link className="header-link" to="/">Home</Link>
      <Link className="header-link" to="/login">Login</Link>
    </div>
  );
}

export default Header;
