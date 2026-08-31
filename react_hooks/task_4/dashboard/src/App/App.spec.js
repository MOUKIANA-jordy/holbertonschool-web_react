import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, {
  coursesList,
  notificationsList,
} from './App';

describe('App component', () => {
  test('renders without crashing', () => {
    render(<App />);

    expect(
      screen.getByText('School dashboard')
    ).toBeInTheDocument();
  });

  test('renders the notification drawer by default', () => {
    render(<App />);

    expect(
      screen.getByRole('button', {
        name: /close/i,
      })
    ).toBeInTheDocument();
  });

  test('handleHideDrawer hides the drawer', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole('button', {
        name: /close/i,
      })
    );

    expect(
      screen.queryByRole('button', {
        name: /close/i,
      })
    ).not.toBeInTheDocument();
  });

  test('handleDisplayDrawer displays the drawer', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole('button', {
        name: /close/i,
      })
    );

    expect(
      screen.queryByRole('button', {
        name: /close/i,
      })
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByText(/your notifications/i)
    );

    expect(
      screen.getByRole('button', {
        name: /close/i,
      })
    ).toBeInTheDocument();
  });

  test('renders the login form when logged out', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /log in to continue/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();
  });

  test('logIn updates email, password and isLoggedIn', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(
      screen.getByLabelText(/email/i),
      'jordy@example.com'
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123'
    );

    await user.click(
      screen.getByDisplayValue('OK')
    );

    const logoutSection =
      document.getElementById('logoutSection');

    expect(logoutSection).toBeInTheDocument();

    expect(logoutSection).toHaveTextContent(
      'jordy@example.com'
    );

    expect(
      screen.getByRole('heading', {
        name: /course list/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByLabelText(/email/i)
    ).not.toBeInTheDocument();
  });

  test('logOut clears the user information', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(
      screen.getByLabelText(/email/i),
      'jordy@example.com'
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123'
    );

    await user.click(
      screen.getByDisplayValue('OK')
    );

    expect(
      document.getElementById('logoutSection')
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('link', {
        name: /logout/i,
      })
    );

    expect(
      document.getElementById('logoutSection')
    ).not.toBeInTheDocument();

    expect(
      screen.getByLabelText(/email/i)
    ).toHaveValue('');

    expect(
      screen.getByLabelText(/password/i)
    ).toHaveValue('');

    expect(
      screen.getByRole('heading', {
        name: /log in to continue/i,
      })
    ).toBeInTheDocument();
  });

  test('removes a notification when clicked', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(
      screen.getByText(/new course available/i)
    ).toBeInTheDocument();

    await user.click(
      screen.getByText(/new course available/i)
    );

    expect(
      screen.queryByText(
        /new course available/i
      )
    ).not.toBeInTheDocument();
  });

  test('logs the notification id when clicked', async () => {
    const user = userEvent.setup();

    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(<App />);

    await user.click(
      screen.getByText(/new resume available/i)
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'Notification 2 has been marked as read'
    );

    consoleSpy.mockRestore();
  });

  test('exports three notifications', () => {
    expect(notificationsList).toHaveLength(3);
  });

  test('exports three courses', () => {
    expect(coursesList).toHaveLength(3);
  });
});
