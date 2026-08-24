import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login component', () => {
  test('renders two labels, two inputs, and one button', () => {
    const { container } = render(<Login />);

    expect(container.querySelectorAll('label')).toHaveLength(2);
    expect(container.querySelectorAll('input')).toHaveLength(2);
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  test('focuses inputs when their labels are clicked', async () => {
    const user = userEvent.setup();
    render(<Login />);

    const emailLabel = screen.getByText(/^email:?$/i);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.click(emailLabel);
    await user.click(emailLabel);
    expect(emailInput).toHaveFocus();

    const passwordLabel = screen.getByText(/^password:?$/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.click(passwordLabel);
    await user.click(passwordLabel);
    expect(passwordInput).toHaveFocus();
  });
});
