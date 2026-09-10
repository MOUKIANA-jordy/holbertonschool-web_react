import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Login from './Login';
import authReducer from '../../features/auth/authSlice';

function renderWithStore() {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  return store;
}

describe('Login component', () => {
  test('renders the login component', () => {
    renderWithStore();

    expect(
      screen.getByRole('heading', {
        name: /log in to continue/i,
      })
    ).toBeInTheDocument();
  });

  test('renders two labels, two form fields and a submit input', () => {
    renderWithStore();

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue('OK')
    ).toBeInTheDocument();
  });

  test('focuses email input when email label is clicked', async () => {
    const user = userEvent.setup();

    renderWithStore();

    const emailInput =
      screen.getByLabelText(/email/i);

    await user.click(
      screen.getByText('Email')
    );

    expect(emailInput).toHaveFocus();
  });

  test('focuses password input when password label is clicked', async () => {
    const user = userEvent.setup();

    renderWithStore();

    const passwordInput =
      screen.getByLabelText(/password/i);

    await user.click(
      screen.getByText('Password')
    );

    expect(passwordInput).toHaveFocus();
  });

  test('submit input is disabled by default', () => {
    renderWithStore();

    expect(
      screen.getByDisplayValue('OK')
    ).toBeDisabled();
  });

  test('keeps submit disabled with invalid email', async () => {
    const user = userEvent.setup();

    renderWithStore();

    await user.type(
      screen.getByLabelText(/email/i),
      'invalid-email'
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123'
    );

    expect(
      screen.getByDisplayValue('OK')
    ).toBeDisabled();
  });

  test('keeps submit disabled with short password', async () => {
    const user = userEvent.setup();

    renderWithStore();

    await user.type(
      screen.getByLabelText(/email/i),
      'test@example.com'
    );

    await user.type(
      screen.getByLabelText(/password/i),
      '123'
    );

    expect(
      screen.getByDisplayValue('OK')
    ).toBeDisabled();
  });

  test('enables submit with valid email and password', async () => {
    const user = userEvent.setup();

    renderWithStore();

    await user.type(
      screen.getByLabelText(/email/i),
      'test@example.com'
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123'
    );

    expect(
      screen.getByDisplayValue('OK')
    ).toBeEnabled();
  });

  test('dispatches login with email and password on submit', async () => {
    const user = userEvent.setup();

    const store = renderWithStore();

    await user.type(
      screen.getByLabelText(/email/i),
      'test@example.com'
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123'
    );

    await user.click(
      screen.getByDisplayValue('OK')
    );

    expect(
      store.getState().auth
    ).toEqual({
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    });
  });

  test('form submission does not reload the page', async () => {
    const user = userEvent.setup();

    const store = renderWithStore();

    await user.type(
      screen.getByLabelText(/email/i),
      'test@example.com'
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123'
    );

    await user.click(
      screen.getByDisplayValue('OK')
    );

    expect(
      store.getState().auth.isLoggedIn
    ).toBe(true);
  });
});
