import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component tests for task_2', () => {
  test('renders 2 input elements (email and password)', () => {
    render(<App />);

    // Check for email input by label
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.type).toBe('email');

    // Check for password input by label
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.type).toBe('password');

    // Verify we have exactly 2 inputs total by checking all input elements
    const { container } = render(<App />);
    const inputElements = container.querySelectorAll('input');
    expect(inputElements).toHaveLength(2);
  });

  test('renders 2 label elements with text Email and Password', () => {
    render(<App />);

    // Check for Email label using regex (case-insensitive)
    const emailLabel = screen.getByText(/email/i);
    expect(emailLabel).toBeInTheDocument();
    expect(emailLabel.tagName.toLowerCase()).toBe('label');

    // Check for Password label using regex (case-insensitive)
    const passwordLabel = screen.getByText(/password/i);
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordLabel.tagName.toLowerCase()).toBe('label');
  });

  test('renders a button with text OK', () => {
    render(<App />);

    // Check for OK button using regex (case-insensitive)
    const okButton = screen.getByRole('button', { name: /ok/i });
    expect(okButton).toBeInTheDocument();
    expect(okButton.textContent).toMatch(/ok/i);
  });
});
