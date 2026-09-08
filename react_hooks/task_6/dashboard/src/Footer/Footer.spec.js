import {
  render,
  screen,
} from '@testing-library/react';
import Footer from './Footer';
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

  test('does not display Contact us with default props', () => {
    render(<Footer />);

    expect(
      screen.queryByRole('link', {
        name: /contact us/i,
      })
    ).not.toBeInTheDocument();
  });

  test('does not display Contact us when user is logged out', () => {
    const user = {
      email: '',
      password: '',
      isLoggedIn: false,
    };

    render(
      <Footer user={user} />
    );

    expect(
      screen.queryByRole('link', {
        name: /contact us/i,
      })
    ).not.toBeInTheDocument();
  });

  test('displays Contact us when user is logged in', () => {
    const user = {
      email: 'user@example.com',
      password: 'password123',
      isLoggedIn: true,
    };

    render(
      <Footer user={user} />
    );

    expect(
      screen.getByRole('link', {
        name: /contact us/i,
      })
    ).toBeInTheDocument();
  });
});

