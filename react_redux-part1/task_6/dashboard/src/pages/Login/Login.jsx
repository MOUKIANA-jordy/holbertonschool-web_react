import { useDispatch } from 'react-redux';

import WithLogging from '../../components/HOC/WithLogging';
import useLogin from '../../hooks/useLogin';
import { login } from '../../features/auth/authSlice';

function Login() {
  const dispatch = useDispatch();

  const handleLogin = (email, password) => {
    dispatch(
      login({
        email,
        password,
      })
    );
  };

  const {
    email,
    password,
    enableSubmit,
    handleEmailChange,
    handlePasswordChange,
    handleLoginSubmit,
  } = useLogin(handleLogin);

  return (
    <div className="login">
      <h2>Log in to continue</h2>

      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">
          Email
        </label>

        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label htmlFor="password">
          Password
        </label>

        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <input
          type="submit"
          value="OK"
          disabled={!enableSubmit}
        />
      </form>
    </div>
  );
}

const LoginWithLogging = WithLogging(Login);

export default LoginWithLogging;
