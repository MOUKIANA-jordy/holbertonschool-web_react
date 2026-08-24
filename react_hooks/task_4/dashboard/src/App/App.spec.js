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

  test('renders the notifications drawer by default', () => {
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
      screen.getByText('Your notifications')
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
        name: 'Log in to continue',
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

    const emailInput =
      screen.getByLabelText(/email/i);

    const passwordInput =
      screen.getByLabelText(/password/i);

    await user.type(
      emailInput,
      'jordy@example.com'
    );

    await user.type(
      passwordInput,
      'password123'
    );

    await user.click(
      screen.getByDisplayValue('OK')
    );

    expect(
      screen.getByText(
        /Welcome jordy@example\.com/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Course list',
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
      screen.getByText(
        /Welcome jordy@example\.com/i
      )
    ).toBeInTheDocument();

    await user.click(
      screen.getByText(/logout/i)
    );

    expect(
      screen.queryByText(
        /Welcome jordy@example\.com/i
      )
    ).not.toBeInTheDocument();

    expect(
      screen.getByLabelText(/email/i)
    ).toHaveValue('');

    expect(
      screen.getByLabelText(/password/i)
    ).toHaveValue('');
  });

  test('removes a notification when it is clicked', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(
      screen.getByText(
        'New course available'
      )
    ).toBeInTheDocument();

    await user.click(
      screen.getByText(
        'New course available'
      )
    );

    expect(
      screen.queryByText(
        'New course available'
      )
    ).not.toBeInTheDocument();
  });

  test('logs when a notification is marked as read', async () => {
    const user = userEvent.setup();

    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(<App />);

    await user.click(
      screen.getByText(
        'New resume available'
      )
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
