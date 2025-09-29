// task_0/dashboard/src/App.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App (Task 0)', () => {
  test('renders the <h1> with text "School dashboard"', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 1, name: /school dashboard/i })
    ).toBeInTheDocument(); // expect #1
  });

  test('renders body/footer texts and the logo image', () => {
    render(<App />);
    const year = new Date().getFullYear();

    expect(
      screen.getByText(/login to access the full dashboard/i)
    ).toBeInTheDocument(); // expect #2

    expect(
      screen.getByText(new RegExp(`Copyright\\s+${year}\\s+-\\s+holberton\\s+School`, 'i'))
    ).toBeInTheDocument(); // expect #3

    expect(
      screen.getByRole('img', { name: /holberton logo/i })
    ).toBeInTheDocument(); // expect #4
  });
});
