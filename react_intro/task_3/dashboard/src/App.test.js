import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component for task_2', () => {
  test('renders email input with label', () => {
    render(<App />);
    const emailLabel = screen.getByLabelText(/email/i);
    expect(emailLabel).toBeInTheDocument();
    expect(emailLabel.type).toBe('email');
  });

  test('renders password input with label', () => {
    render(<App />);
    const passwordLabel = screen.getByLabelText(/password/i);
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordLabel.type).toBe('password');
  });

  test('renders OK button', () => {
    render(<App />);
    const okButton = screen.getByRole('button', { name: /ok/i });
    expect(okButton).toBeInTheDocument();
  });

  test('labels are properly associated with inputs', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput.id).toBe('email');
    expect(passwordInput.id).toBe('password');
  });
});
