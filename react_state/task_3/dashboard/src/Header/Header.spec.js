import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import Header from './Header';
import NewContext from '../Context/context';

describe('Header component', () => {
  test('renders the Holberton logo', () => {
    render(<Header />);

    expect(
      screen.getByRole('img', {
        name: /holberton logo/i,
      })
    ).toBeInTheDocument();
  });

  test('renders the correct h1 heading', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /school dashboard/i,
      })
    ).toBeInTheDocument();
  });

  test('does not render logoutSection with default context', () => {
    const { container } = render(<Header />);

    expect(
      container.querySelector('#logoutSection')
    ).not.toBeInTheDocument();
  });

  test('renders logoutSection when user is logged in', () => {
    const contextValue = {
      user: {
        email: 'user@example.com',
        password: 'password123',
        isLoggedIn: true,
      },
      logOut: jest.fn(),
    };

    const { container } = render(
      <NewContext.Provider value={contextValue}>
        <Header />
      </NewContext.Provider>
    );

    expect(
      container.querySelector('#logoutSection')
    ).toBeInTheDocument();

    expect(
      screen.getByText(/user@example\.com/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /logout/i,
      })
    ).toBeInTheDocument();
  });

  test('calls logOut when logout link is clicked', () => {
    const logOut = jest.fn();

    const contextValue = {
      user: {
        email: 'user@example.com',
        password: 'password123',
        isLoggedIn: true,
      },
      logOut,
    };

    render(
      <NewContext.Provider value={contextValue}>
        <Header />
      </NewContext.Provider>
    );

    fireEvent.click(
      screen.getByRole('link', {
        name: /logout/i,
      })
    );

    expect(logOut).toHaveBeenCalledTimes(1);
  });
});
