/* eslint-disable react-refresh/only-export-components */

import React from 'react';
import WithLogging from '../HOC/WithLogging';

function Login() {
  return (
    <div className="App-body min-h-[45vh] px-12 py-9 max-[912px]:px-5 max-[520px]:px-0 max-[520px]:py-5">
      <p className="mb-5">
        Login to access the full dashboard
      </p>

      <form className="flex flex-wrap items-center gap-3 max-[600px]:flex-col max-[600px]:items-stretch">
        <label htmlFor="email">
          Email:
        </label>

        <input
          className="rounded-sm border border-gray-400 px-2 py-1 max-[600px]:w-full"
          type="email"
          id="email"
          name="email"
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
        />

        <button
          className="rounded-sm border border-gray-400 bg-gray-100 px-3 py-1 hover:bg-gray-200 max-[600px]:mt-2 max-[600px]:w-fit"
          type="button"
        >
          OK
        </button>
      </form>
    </div>
  );
}

export default WithLogging(Login);
