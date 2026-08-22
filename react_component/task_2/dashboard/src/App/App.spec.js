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
      screen.getByRole('button', {
        name: /^ok$/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('table')
    ).not.toBeInTheDocument();
  });

  test('renders CourseList when isLoggedIn is true', () => {
    render(<App isLoggedIn />);

    const courseTable = screen.getByRole('table');

    expect(courseTable).toBeInTheDocument();
    expect(courseTable).toHaveAttribute(
      'id',
      'CourseList'
    );

    expect(
      screen.getByText(/available courses/i)
    ).toBeInTheDocument();

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

    fireEvent.keyDown(document, {
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

    fireEvent.keyDown(document, {
      key: 'h',
      ctrlKey: true,
    });

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith(
      'Logging you out'
    );

    alertSpy.mockRestore();
  });

  test('removes the keyboard listener when App is unmounted', () => {
    const logOut = jest.fn();

    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});

    const { unmount } = render(
      <App logOut={logOut} />
    );

    unmount();

    fireEvent.keyDown(document, {
      key: 'h',
      ctrlKey: true,
    });

    expect(logOut).not.toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});
