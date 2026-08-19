import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders the School dashboard heading', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: /school dashboard/i })
    ).toBeInTheDocument();
  });

  test('renders the login message in the app body', () => {
    render(<App />);

    expect(
      screen.getByText(/login to access the full dashboard/i)
    ).toBeInTheDocument();
  });

  test('renders the copyright message in the app footer', () => {
    render(<App />);
    const currentYear = new Date().getFullYear();

    expect(
      screen.getByText(
        new RegExp(
          `copyright\\s+${currentYear}\\s+-\\s+holberton\\s+school`,
          'i'
        )
      )
    ).toBeInTheDocument();
  });

  test('renders the Holberton logo image', () => {
    render(<App />);

    expect(
      screen.getByRole('img', { name: /holberton logo/i })
    ).toBeInTheDocument();
  });
});
