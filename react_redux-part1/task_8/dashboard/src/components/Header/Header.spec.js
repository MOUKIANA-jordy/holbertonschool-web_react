import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Header from './Header';
import authReducer, {
  login,
} from '../../features/auth/authSlice';

function createTestStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
}

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
}

describe('Header component', () => {
  test('renders the Header component', () => {
    const store = createTestStore();

    renderWithStore(store);

    expect(
      screen.getByText('School dashboard')
    ).toBeInTheDocument();
  });

  test('displays logout link when user is logged in', () => {
    const store = createTestStore();

    store.dispatch(
      login({
        email: 'test@example.com',
        password: 'password123',
      })
    );

    renderWithStore(store);

    expect(
      screen.getByRole('link', {
        name: /logout/i,
      })
    ).toBeInTheDocument();
  });

  test('displays welcome message with user email', () => {
    const store = createTestStore();

    store.dispatch(
      login({
        email: 'test@example.com',
        password: 'password123',
      })
    );

    renderWithStore(store);

    expect(
      screen.getByText(
        /test@example\.com/i
      )
    ).toBeInTheDocument();
  });

  test('logs user out when logout link is clicked', async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    store.dispatch(
      login({
        email: 'test@example.com',
        password: 'password123',
      })
    );

    renderWithStore(store);

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
