import {
  render,
  screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Footer from './Footer';
import authReducer from '../../features/auth/authSlice';
import { getCurrentYear } from '../../utils/utils';

const renderWithStore = (isLoggedIn = false) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: {
          email: isLoggedIn
            ? 'user@example.com'
            : '',
          password: isLoggedIn
            ? 'password123'
            : '',
        },
        isLoggedIn,
      },
    },
  });

  return render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );
};

describe('Footer component', () => {
  test('renders the copyright text', () => {
    renderWithStore();

    expect(
      screen.getByText(
        `Copyright ${getCurrentYear()} - Holberton School`
      )
    ).toBeInTheDocument();
  });

  test('does not display Contact us when user is logged out', () => {
    renderWithStore(false);

    expect(
      screen.queryByRole('link', {
        name: /contact us/i,
      })
    ).not.toBeInTheDocument();
  });

  test('displays Contact us when user is logged in', () => {
    renderWithStore(true);

    expect(
      screen.getByRole('link', {
        name: /contact us/i,
      })
    ).toBeInTheDocument();
  });
});
