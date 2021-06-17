import React from 'react';
import { Link } from 'react-router-dom';

import AuthButton from './_AuthButton';

const NavBar = () => (
  <div id="nav">
    {/* App title */}
    <h1>
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      ReactJS <span role="img" aria-label="heart">❤️</span> 8base
    </h1>
    <br />
    <Link to="/">Home</Link>
    <span> | </span>
    <Link to="/crud">CRUD Example</Link>
    <span> | </span>
    <AuthButton />
  </div>
);

export { NavBar };
