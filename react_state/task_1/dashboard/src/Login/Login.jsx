/* eslint-disable react-refresh/only-export-components */

import React, { Component } from 'react';
import WithLogging from '../HOC/WithLogging';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
      enableSubmit: false,
    };

    this.handleLoginSubmit =
      this.handleLoginSubmit.bind(this);
    this.handleChangeEmail =
      this.handleChangeEmail.bind(this);
    this.handleChangePassword =
      this.handleChangePassword.bind(this);
    this.updateSubmitState =
      this.updateSubmitState.bind(this);
  }

  isEmailValid(email) {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  updateSubmitState() {
    const { email, password } = this.state;

    this.setState({
      enableSubmit:
        this.isEmailValid(email) &&
        password.length >= 8,
    });
  }

  handleChangeEmail(event) {
    this.setState(
      {
        email: event.target.value,
      },
      this.updateSubmitState
    );
  }

  handleChangePassword(event) {
    this.setState(
      {
        password: event.target.value,
      },
      this.updateSubmitState
    );
  }

  handleLoginSubmit(event) {
    event.preventDefault();

    const { enableSubmit } = this.state;

    if (enableSubmit) {
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  render() {
    const {
      email,
      password,
      enableSubmit,
    } = this.state;

    return (
      <div className="App-body min-h-[45vh] px-12 py-9 max-[912px]:px-5 max-[520px]:px-0 max-[520px]:py-5">
        <p className="mb-5">
          Login to access the full dashboard
        </p>

        <form
          className="flex flex-wrap items-center gap-3 max-[600px]:flex-col max-[600px]:items-stretch"
          onSubmit={this.handleLoginSubmit}
        >
          <label htmlFor="email">
            Email:
          </label>

          <input
            className="rounded-sm border border-gray-400 px-2 py-1 max-[600px]:w-full"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChangeEmail}
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
            value={password}
            onChange={this.handleChangePassword}
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
}

export { Login };
export default WithLogging(Login);
