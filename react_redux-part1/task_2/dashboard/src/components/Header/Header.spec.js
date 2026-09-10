import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

describe('Header component', () => {
  test('renders the Holberton logo', () => {
    render(<Header />);

    expect(
      screen.getByRole('img', {
        name: /holberton logo/i,
      })
    ).toBeInTheDocument();
  });

  test('renders the School dashboard heading', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /school dashboard/i,
      })
    ).toBeInTheDocument();
  });

  test('does not render logoutSection with default props', () => {
    const { container } = render(
      <Header />
    );

    expect(
      container.querySelector('#logoutSection')
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('link', {
        name: /logout/i,
      })
    ).not.toBeInTheDocument();
  });

  test('renders logoutSection when user is logged in', () => {
    const user = {
      email: 'user@example.com',
      password: 'password123',
      isLoggedIn: true,
    };

    const { container } = render(
      <Header user={user} logOut={jest.fn()} />
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

  test('calls logOut when logout link is clicked', async () => {
    const userEventInstance =
      userEvent.setup();

    const logOut = jest.fn();

    const user = {
      email: 'user@example.com',
      password: 'password123',
      isLoggedIn: true,
    };

    render(
      <Header user={user} logOut={logOut} />
    );

    await userEventInstance.click(
      screen.getByRole('link', {
        name: /logout/i,
      })
    );

    expect(logOut).toHaveBeenCalledTimes(1);
  });
});
