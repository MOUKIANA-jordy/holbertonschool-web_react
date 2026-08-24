import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component', () => {
  test('renders the login component', () => {
    const { container } = render(
      <Login />
    );

    expect(container).toBeInTheDocument();

    expect(
      screen.getByText(
        /login to access the full dashboard/i
      )
    ).toBeInTheDocument();
  });

  test('renders two labels, two form fields and a submit input', () => {
    const { container } = render(
      <Login />
    );

    expect(
      container.querySelectorAll('label')
    ).toHaveLength(2);

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

    render(<Login />);

    await user.click(
      screen.getByText(/^email:$/i)
    );

    expect(
      screen.getByLabelText(/email/i)
    ).toHaveFocus();
  });

  test('focuses password input when password label is clicked', async () => {
    const user = userEvent.setup();

    render(<Login />);

    await user.click(
      screen.getByText(/^password:$/i)
    );

    expect(
      screen.getByLabelText(/password/i)
    ).toHaveFocus();
  });

  test('submit input is disabled by default', () => {
    render(<Login />);

    expect(
      screen.getByDisplayValue('OK')
    ).toBeDisabled();
  });

  test('keeps submit disabled with invalid email', async () => {
    const user = userEvent.setup();

    render(<Login />);

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

    render(<Login />);

    await user.type(
      screen.getByLabelText(/email/i),
      'user@example.com'
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'short'
    );

    expect(
      screen.getByDisplayValue('OK')
    ).toBeDisabled();
  });

  test('enables submit with valid email and password', async () => {
    const user = userEvent.setup();

    render(<Login />);

    await user.type(
      screen.getByLabelText(/email/i),
      'user@example.com'
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123'
    );

    expect(
      screen.getByDisplayValue('OK')
    ).toBeEnabled();
  });

  test('calls logIn with email and password on submit', async () => {
    const user = userEvent.setup();
    const logIn = jest.fn();

    render(<Login logIn={logIn} />);

    await user.type(
      screen.getByLabelText(/email/i),
      'user@example.com'
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123'
    );

    await user.click(
      screen.getByDisplayValue('OK')
    );

    expect(logIn).toHaveBeenCalledTimes(1);

    expect(logIn).toHaveBeenCalledWith(
      'user@example.com',
      'password123'
    );
  });

  test('form submission does not reload the page', async () => {
    const user = userEvent.setup();
    const logIn = jest.fn();

    render(<Login logIn={logIn} />);

    await user.type(
      screen.getByLabelText(/email/i),
      'user@example.com'
    );

    await user.type(
      screen.getByLabelText(/password/i),
      'password123'
    );

    const form = screen
      .getByDisplayValue('OK')
      .closest('form');

    expect(form).toBeInTheDocument();

    await user.click(
      screen.getByDisplayValue('OK')
    );

    expect(logIn).toHaveBeenCalledWith(
      'user@example.com',
      'password123'
    );
  });
});
