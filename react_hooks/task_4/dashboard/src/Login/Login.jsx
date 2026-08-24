/* eslint-disable react-refresh/only-export-components */

import { useState } from 'react';
import PropTypes from 'prop-types';
import WithLogging from '../HOC/WithLogging';

function Login({ logIn }) {
  const [enableSubmit, setEnableSubmit] =
    useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const isEmailValid = (email) => {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  };

  const updateSubmitState = (
    email,
    password
  ) => {
    setEnableSubmit(
      isEmailValid(email) &&
        password.length >= 8
    );
  };

  const handleChangeEmail = (event) => {
    const email = event.target.value;
    const { password } = formData;

    setFormData({
      ...formData,
      email,
    });

    updateSubmitState(email, password);
  };

  const handleChangePassword = (event) => {
    const password = event.target.value;
    const { email } = formData;

    setFormData({
      ...formData,
      password,
    });

    updateSubmitState(email, password);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    const { email, password } = formData;

    logIn(email, password);
  };

  return (
    <div className="App-body min-h-[45vh] px-12 py-9 max-[912px]:px-5 max-[520px]:px-0 max-[520px]:py-5">
      <p className="mb-5">
        Login to access the full dashboard
      </p>

      <form
        className="flex flex-wrap items-center gap-3 max-[600px]:flex-col max-[600px]:items-stretch"
        onSubmit={handleLoginSubmit}
      >
        <label htmlFor="email">
          Email:
        </label>

        <input
          className="rounded-sm border border-gray-400 px-2 py-1 max-[600px]:w-full"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChangeEmail}
        />

        <label
          className="ml-2 max-[600px]:ml-0"
          htmlFor="password"
        >
          Password:
        </label>

        <input
          className="rounded-sm border border-gray-400 px-2 py-1 max-[600px]:w-full"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChangePassword}
        />

        <input
          className="rounded-sm border border-gray-400 bg-gray-100 px-3 py-1 enabled:cursor-pointer enabled:hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 max-[600px]:mt-2 max-[600px]:w-fit"
          type="submit"
          value="OK"
          disabled={!enableSubmit}
        />
      </form>
    </div>
  );
}

Login.defaultProps = {
  logIn: () => {},
};

Login.propTypes = {
  logIn: PropTypes.func,
};

export { Login };
export default WithLogging(Login);
