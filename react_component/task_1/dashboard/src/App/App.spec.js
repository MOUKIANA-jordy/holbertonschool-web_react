import React from 'react';
import {
  fireEvent,
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

  test('renders Login when isLoggedIn is false', () => {
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

    const table = screen.getByRole('table');

    expect(table).toBeInTheDocument();
    expect(table).toHaveAttribute('id', 'CourseList');

    expect(
      screen.queryByLabelText(/email/i)
    ).not.toBeInTheDocument();
  });

  test('calls logOut once when control and h are pressed', () => {
    const logOut = jest.fn();

    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});

    render(<App logOut={logOut} />);

    fireEvent.keyDown(window, {
      key: 'h',
      ctrlKey: true,
    });

    expect(logOut).toHaveBeenCalledTimes(1);

    alertSpy.mockRestore();
  });

  test('displays an alert when control and h are pressed', () => {
    const logOut = jest.fn();

    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});

    render(<App logOut={logOut} />);

    fireEvent.keyDown(window, {
      key: 'h',
      ctrlKey: true,
    });

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith(
      'Logging you out'
    );

    alertSpy.mockRestore();
  });
});
