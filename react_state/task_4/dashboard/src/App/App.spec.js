import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

async function logInUser() {
  const user = userEvent.setup();

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput =
    screen.getByLabelText(/password/i);

  await user.clear(emailInput);
  await user.type(emailInput, 'user@example.com');

  await user.clear(passwordInput);
  await user.type(passwordInput, 'password123');

  const submitButton = screen.getByRole('button', {
    name: /ok/i,
  });

  expect(submitButton).toBeEnabled();

  await user.click(submitButton);
}

describe('App component', () => {
  test('renders successfully', () => {
    const { container } = render(<App />);

    expect(container).toBeInTheDocument();
  });

  test('renders Login when the user is logged out', () => {
    render(<App />);

    expect(
      screen.getByText(
        /login to access the full dashboard/i
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('table')
    ).not.toBeInTheDocument();
  });

  test('renders CourseList after a successful login', async () => {
    render(<App />);

    await logInUser();

    expect(
      screen.getByRole('table')
    ).toBeInTheDocument();

    expect(
      screen.getByText(/available courses/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        /login to access the full dashboard/i
      )
    ).not.toBeInTheDocument();
  });

  test('displays logoutSection after login', async () => {
    render(<App />);

    await logInUser();

    expect(
      document.querySelector('#logoutSection')
    ).toBeInTheDocument();

    expect(
      screen.getByText(/user@example\.com/i)
    ).toBeInTheDocument();
  });

  test('logs the user out from the Header', async () => {
    render(<App />);

    await logInUser();

    expect(
      screen.getByRole('table')
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('link', {
        name: /logout/i,
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          /login to access the full dashboard/i
        )
      ).toBeInTheDocument();
    });

    expect(
      screen.queryByRole('table')
    ).not.toBeInTheDocument();

    expect(
      document.querySelector('#logoutSection')
    ).not.toBeInTheDocument();
  });

  test('opens and closes the notifications drawer', async () => {
    render(<App />);

    expect(
      screen.queryByRole('button', {
        name: /close/i,
      })
    ).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByText(/your notifications/i)
    );

    expect(
      screen.getByRole('button', {
        name: /close/i,
      })
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', {
        name: /close/i,
      })
    );

    expect(
      screen.queryByRole('button', {
        name: /close/i,
      })
    ).not.toBeInTheDocument();
  });

  test('renders the school news section', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', {
        name: /news from the school/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /holberton school news goes here/i
      )
    ).toBeInTheDocument();
  });

  test('logs the user out with control and h', async () => {
    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});

    render(<App />);

    await logInUser();

    expect(
      screen.getByRole('table')
    ).toBeInTheDocument();

    fireEvent.keyDown(document, {
      key: 'h',
      ctrlKey: true,
    });

    expect(alertSpy).toHaveBeenCalledWith(
      'Logging you out'
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          /login to access the full dashboard/i
        )
      ).toBeInTheDocument();
    });

    alertSpy.mockRestore();
  });

  test('removes the keyboard listener when unmounted', () => {
    const removeEventListenerSpy = jest.spyOn(
      document,
      'removeEventListener'
    );

    const { unmount } = render(<App />);

    unmount();

    expect(
      removeEventListenerSpy
    ).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });
});
