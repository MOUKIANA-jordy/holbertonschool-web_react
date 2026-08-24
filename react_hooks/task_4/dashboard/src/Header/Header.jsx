import { useContext } from 'react';
import logo from '../assets/holberton-logo.jpg';
import NewContext from '../Context/context';

function Header() {
  const { user, logOut } =
    useContext(NewContext);

  const handleLogout = (event) => {
    event.preventDefault();
    logOut();
  };

  return (
    <header className="App-header border-b-[3px] border-[var(--main-color)]">
      <div className="flex items-center px-4 py-2 max-[520px]:flex-col max-[520px]:text-center">
        <img
          className="h-32 w-auto max-[520px]:h-24"
          src={logo}
          alt="holberton logo"
        />

        <h1 className="ml-4 text-3xl font-bold text-[var(--main-color)] max-[520px]:ml-0 max-[520px]:text-2xl">
          School dashboard
        </h1>
      </div>

      {user.isLoggedIn && (
        <div
          id="logoutSection"
          className="px-4 pb-3 text-right max-[520px]:text-center"
        >
          Welcome <strong>{user.email}</strong>{' '}
          <em>
            (
            <a
              href="#logout"
              className="text-[var(--main-color)] underline"
              onClick={handleLogout}
            >
              logout
            </a>
            )
          </em>
        </div>
      )}
    </header>
  );
}

export default Header;
