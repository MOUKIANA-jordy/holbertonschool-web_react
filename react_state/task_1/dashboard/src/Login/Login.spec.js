import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component', () => {
  test('renders without crashing', () => {
    render(<Login />);

    expect(
      screen.getByText(
        /login to access the full dashboard/i
      )
    ).toBeInTheDocument();
  });

  test('renders two labels, two inputs and one submit element', () => {
    const { container } = render(<Login />);

    expect(
      container.querySelectorAll('label')
    ).toHaveLength(2);

    expect(
      container.querySelectorAll(
        'input[type="email"], input[type="password"]'
      )
    ).toHaveLength(2);

    expect(
      screen.getByRole('button', {
        name: /^ok$/i,
      })
    ).toBeInTheDocument();
  });

  test('focuses inputs when corresponding labels are clicked', async () => {
    const user = userEvent.setup();

    render(<Login />);

    const emailInput =
      screen.getByLabelText(/email/i);

    const passwordInput =
      screen.getByLabelText(/password/i);

    await user.click(
      screen.getByText(/^email:$/i)
    );

    expect(emailInput).toHaveFocus();

    await user.click(
      screen.getByText(/^password:$/i)
    );

    expect(passwordInput).toHaveFocus();
  });

  test('submit input is disabled by default', () => {
    render(<Login />);

    expect(
      screen.getByRole('button', {
        name: /^ok$/i,
      })
    ).toBeDisabled();
  });

  test('submit remains disabled when email is invalid', () => {
    render(<Login />);

    fireEvent.change(
      screen.getByLabelText(/email/i),
      {
        target: {
          value: 'invalid-email',
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/password/i),
      {
        target: {
          value: 'password123',
        },
      }
    );

    expect(
      screen.getByRole('button', {
        name: /^ok$/i,
      })
    ).toBeDisabled();
  });

  test('submit remains disabled when password has fewer than 8 characters', () => {
    render(<Login />);

    fireEvent.change(
      screen.getByLabelText(/email/i),
      {
        target: {
          value: 'user@example.com',
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/password/i),
      {
        target: {
          value: '1234567',
        },
      }
    );

    expect(
      screen.getByRole('button', {
        name: /^ok$/i,
      })
    ).toBeDisabled();
  });

  test('submit becomes enabled with a valid email and password', () => {
    render(<Login />);

    fireEvent.change(
      screen.getByLabelText(/email/i),
      {
        target: {
          value: 'user@example.com',
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/password/i),
      {
        target: {
          value: 'password123',
        },
      }
    );

    expect(
      screen.getByRole('button', {
        name: /^ok$/i,
      })
    ).toBeEnabled();
  });

  test('submitting the form does not reload the page', () => {
    const { container } = render(<Login />);

    fireEvent.change(
      screen.getByLabelText(/email/i),
      {
        target: {
          value: 'user@example.com',
        },
      }
    );

    fireEvent.change(
      screen.getByLabelText(/password/i),
      {
        target: {
          value: 'password123',
        },
      }
    );

    fireEvent.submit(
      container.querySelector('form')
    );

    expect(
      screen.getByRole('button', {
        name: /^ok$/i,
      })
    ).toBeEnabled();
  });
});
