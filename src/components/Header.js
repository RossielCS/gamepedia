import React from 'react';
import GamesForm from './GamesForm';

const Header = () => (
  <div className="Header">
    <div className="header-title">
      <h1>
        <a href="/">
          gamepedia
        </a>
      </h1>
    </div>
    <GamesForm className="Games-form" />
  </div>
);

export default Header;
