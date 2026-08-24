import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import App from './App';

function completeLoginForm() {
  fireEvent.change(
    screen.getByLabelText(/email/i),
    {
      target: {
        value: 'user@example.com',
      },
    }
  );

  fireEvent.change(
    screen.getByLabelText(/password/i),
    {
      target: {
        value: 'password123',
      },
    }
  );
}

describe('App component', () => {
  test('renders successfully', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /school dashboard/i,
      })
    ).toBeInTheDocument();
  });

  test('renders Login by default', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /log in to continue/i,
      })
    ).toBeInTheDocument();

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
    ).toBeDisabled();

    expect(
      screen.queryByRole('table')
    ).not.toBeInTheDocument();
  });

  test('renders CourseList after successful login', () => {
    render(<App />);

    completeLoginForm();

    const submitButton = screen.getByRole(
      'button',
      {
        name: /^ok$/i,
      }
    );

    expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /course list/i,
      })
    ).toBeInTheDocument();

    const courseTable =
      screen.getByRole('table');

    expect(courseTable).toBeInTheDocument();
    expect(courseTable).toHaveAttribute(
      'id',
      'CourseList'
    );

    expect(
      screen.queryByLabelText(/email/i)
    ).not.toBeInTheDocument();

    expect(
      screen.queryByLabelText(/password/i)
    ).not.toBeInTheDocument();
  });

  test('displays and hides the notifications drawer', () => {
    render(<App />);

    expect(
      screen.queryByRole('button', {
        name: /close/i,
      })
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByText(/your notifications/i)
    );

    const closeButton = screen.getByRole(
      'button',
      {
        name: /close/i,
      }
    );

    expect(closeButton).toBeInTheDocument();

    expect(
      screen.getAllByRole('listitem')
    ).toHaveLength(3);

    fireEvent.click(closeButton);

    expect(
      screen.queryByRole('button', {
        name: /close/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryAllByRole('listitem')
    ).toHaveLength(0);
  });

  test('renders the school news section', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /news from the school/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /holberton school news goes here/i
      )
    ).toBeInTheDocument();
  });

  test('displays an alert when control and h are pressed', () => {
    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});

    render(<App />);

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

  test('logs the user out when control and h are pressed', () => {
    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});

    render(<App />);

    completeLoginForm();

    fireEvent.click(
      screen.getByRole('button', {
        name: /^ok$/i,
      })
    );

    expect(
      screen.getByRole('table')
    ).toBeInTheDocument();

    fireEvent.keyDown(document, {
      key: 'h',
      ctrlKey: true,
    });

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('table')
    ).not.toBeInTheDocument();

    alertSpy.mockRestore();
  });

  test('removes keyboard listener when App is unmounted', () => {
    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});

    const { unmount } = render(<App />);

    unmount();

    fireEvent.keyDown(document, {
      key: 'h',
      ctrlKey: true,
    });

    expect(alertSpy).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});
