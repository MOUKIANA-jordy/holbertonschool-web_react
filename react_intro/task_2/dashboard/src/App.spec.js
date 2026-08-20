import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component tests for task_2', () => {
  test('renders 2 input elements (email and password)', () => {
    const { container } = render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();

    const inputElements = container.querySelectorAll('input');
    expect(inputElements).toHaveLength(2);
  });

  test('renders 2 label elements with text Email and Password', () => {
    const { container } = render(<App />);

    const emailLabel = screen.getByText(/email/i);
    expect(emailLabel).toBeInTheDocument();

    const passwordLabel = screen.getByText(/password/i);
    expect(passwordLabel).toBeInTheDocument();

    const labelElements = container.querySelectorAll('label');
    expect(labelElements).toHaveLength(2);
  });

  test('renders a button with text OK', () => {
    render(<App />);

    const okButton = screen.getByRole('button', { name: /^ok$/i });
    expect(okButton).toBeInTheDocument();
  });
});
