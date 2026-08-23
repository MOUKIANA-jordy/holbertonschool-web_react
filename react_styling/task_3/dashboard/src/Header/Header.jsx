import React from 'react';
import logo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex items-center border-b-[3px] border-[var(--main-color)] p-4">
      <img
        className="h-[200px] w-auto"
        src={logo}
        alt="holberton logo"
      />

      <h1 className="ml-4 text-3xl font-bold text-[var(--main-color)]">
        School dashboard
      </h1>
    </div>
  );
}

export default Header;
