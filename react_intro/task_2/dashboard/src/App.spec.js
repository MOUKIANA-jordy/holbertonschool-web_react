import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component tests for task_2', () => {
  test('renders 2 input elements (email and password)', () => {
    const { container } = render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput.type).toBe('email');

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput.type).toBe('password');

    const inputElements = container.querySelectorAll('input');
    expect(inputElements).toHaveLength(2);
  });

  test('renders 2 label elements with text Email and Password', () => {
    render(<App />);

    const emailLabel = screen.getByText(/email/i);
    expect(emailLabel).toBeInTheDocument();
    expect(emailLabel.tagName.toLowerCase()).toBe('label');

    const passwordLabel = screen.getByText(/password/i);
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordLabel.tagName.toLowerCase()).toBe('label');

    expect(document.querySelectorAll('label')).toHaveLength(2);
  });

  test('renders a button with text OK', () => {
    render(<App />);

    const okButton = screen.getByRole('button', { name: /ok/i });
    expect(okButton).toBeInTheDocument();
    expect(okButton.textContent).toMatch(/ok/i);
  });
});
