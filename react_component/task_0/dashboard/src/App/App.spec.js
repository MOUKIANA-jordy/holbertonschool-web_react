import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders successfully', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /school dashboard/i,
      })
    ).toBeInTheDocument();
  });

  test('renders the Login form when isLoggedIn is false', () => {
    render(<App isLoggedIn={false} />);

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /^ok$/i })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('table')
    ).not.toBeInTheDocument();
  });

  test('renders CourseList when isLoggedIn is true', () => {
    render(<App isLoggedIn />);

    const courseTable = screen.getByRole('table');

    expect(courseTable).toBeInTheDocument();
    expect(courseTable).toHaveAttribute('id', 'CourseList');

    expect(
      screen.getByText(/available courses/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByLabelText(/email/i)
    ).not.toBeInTheDocument();
  });
});
