import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Footer from './Footer';
import authReducer from '../../features/auth/authSlice';

const renderWithStore = (isLoggedIn = false) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: {
          email: isLoggedIn ? 'test@example.com' : '',
          password: '',
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
      screen.getByText(/Copyright/i)
    ).toBeInTheDocument();
  });

  test('does not display Contact us when user is logged out', () => {
    renderWithStore(false);

    expect(
      screen.queryByText(/Contact us/i)
    ).not.toBeInTheDocument();
  });

  test('displays Contact us when user is logged in', () => {
    renderWithStore(true);

    expect(
      screen.getByText(/Contact us/i)
    ).toBeInTheDocument();
  });
});
