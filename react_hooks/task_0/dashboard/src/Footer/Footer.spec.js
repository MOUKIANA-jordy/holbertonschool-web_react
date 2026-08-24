import {
  render,
  screen,
} from '@testing-library/react';
import Footer from './Footer';
import NewContext from '../Context/context';
import { getCurrentYear } from '../utils/utils';

describe('Footer component', () => {
  test('renders the copyright text', () => {
    render(<Footer />);

    expect(
      screen.getByText(
        `Copyright ${getCurrentYear()} - Holberton School`
      )
    ).toBeInTheDocument();
  });

  test('does not display Contact us with default context', () => {
    render(<Footer />);

    expect(
      screen.queryByRole('link', {
        name: /contact us/i,
      })
    ).not.toBeInTheDocument();
  });

  test('does not display Contact us when user is logged out', () => {
    const contextValue = {
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
      logOut: jest.fn(),
    };

    render(
      <NewContext.Provider value={contextValue}>
        <Footer />
      </NewContext.Provider>
    );

    expect(
      screen.queryByRole('link', {
        name: /contact us/i,
      })
    ).not.toBeInTheDocument();
  });

  test('displays Contact us when user is logged in', () => {
    const contextValue = {
      user: {
        email: 'user@example.com',
        password: 'password123',
        isLoggedIn: true,
      },
      logOut: jest.fn(),
    };

    render(
      <NewContext.Provider value={contextValue}>
        <Footer />
      </NewContext.Provider>
    );

    expect(
      screen.getByRole('link', {
        name: /contact us/i,
      })
    ).toBeInTheDocument();
  });
});
