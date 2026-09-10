import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/holberton-logo.jpg';
import { logout } from '../../features/auth/authSlice';

function Header() {
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="Holberton logo" />
      <h1>School dashboard</h1>

      {isLoggedIn && (
        <section id="logoutSection">
          Welcome {user.email} (
          <a href="#" onClick={handleLogout}>
            logout
          </a>
          )
        </section>
      )}
    </header>
  );
}

export default Header;
