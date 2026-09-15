import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Header from './Header';
import authReducer from '../../features/auth/authSlice';

const createStore = (isLoggedIn = false) =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: {
          email: isLoggedIn
            ? 'test@example.com'
            : '',
          password: '',
        },
        isLoggedIn,
      },
    },
  });

const renderWithStore = (isLoggedIn = false) => {
  const store = createStore(isLoggedIn);

  const renderResult = render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  return {
    store,
    ...renderResult,
  };
};

describe('Header component', () => {
  test('renders the logo', () => {
    renderWithStore();

    expect(
      screen.getByAltText('holberton logo')
    ).toBeInTheDocument();
  });

  test('renders the School dashboard title', () => {
    renderWithStore();

    expect(
      screen.getByText('School dashboard')
    ).toBeInTheDocument();
  });

  test('does not display logout section when user is logged out', () => {
    renderWithStore(false);

    expect(
      screen.queryByText(/Welcome/i)
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('link', {
        name: /logout/i,
      })
    ).not.toBeInTheDocument();
  });

  test('displays user email and logout link when user is logged in', () => {
    renderWithStore(true);

    expect(
      screen.getByText('test@example.com')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /logout/i,
      })
    ).toBeInTheDocument();
  });

  test('logs out the user when logout link is clicked', async () => {
    const user = userEvent.setup();

    const { store } = renderWithStore(true);

    expect(
      store.getState().auth.isLoggedIn
    ).toBe(true);

    await user.click(
      screen.getByRole('link', {
        name: /logout/i,
      })
    );

    expect(
      store.getState().auth.isLoggedIn
    ).toBe(false);
  });
});
