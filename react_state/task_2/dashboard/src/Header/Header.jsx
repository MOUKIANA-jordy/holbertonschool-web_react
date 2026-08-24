import React from 'react';
import logo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex items-center border-b-[3px] border-[var(--main-color)] p-4 max-[520px]:p-2">
      <img
        className="h-[200px] w-auto max-[912px]:h-[140px] max-[520px]:h-[100px]"
        src={logo}
        alt="holberton logo"
      />

      <h1 className="ml-4 text-3xl font-bold text-[var(--main-color)] max-[912px]:text-2xl max-[520px]:ml-2 max-[520px]:text-xl">
        School dashboard
      </h1>
    </div>
  );
}

export default Header;
