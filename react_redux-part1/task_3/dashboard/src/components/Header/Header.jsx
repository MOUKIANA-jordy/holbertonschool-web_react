import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/holberton-logo.jpg';
import { logout } from '../../features/auth/authSlice';

function Header() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>School dashboard</h1>
      </div>

      {isLoggedIn && (
        <section id="logoutSection">
          Welcome <b>{user.email}</b>{' '}
          <a href="#" onClick={handleLogout}>
            (logout)
          </a>
        </section>
      )}
    </>
  );
}

export default Header;
