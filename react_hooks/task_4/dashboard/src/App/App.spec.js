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

  const emailInput =
    screen.getByLabelText(/email/i);

  const passwordInput =
    screen.getByLabelText(/password/i);

  await user.clear(emailInput);
  await user.type(
    emailInput,
    'user@example.com'
  );

  await user.clear(passwordInput);
  await user.type(
    passwordInput,
    'password123'
  );

  const submitButton =
    screen.getByDisplayValue('OK');

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

  test('renders CourseList after login', async () => {
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

  test('displays logout section after login', async () => {
    render(<App />);

    await logInUser();

    expect(
      document.querySelector('#logoutSection')
    ).toBeInTheDocument();

    expect(
      screen.getByText(/user@example\.com/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: /logout/i,
      })
    ).toBeInTheDocument();
  });

  test('displays Contact us after login', async () => {
    render(<App />);

    expect(
      screen.queryByRole('link', {
        name: /contact us/i,
      })
    ).not.toBeInTheDocument();

    await logInUser();

    expect(
      screen.getByRole('link', {
        name: /contact us/i,
      })
    ).toBeInTheDocument();
  });

  test('logs the user out from Header', async () => {
    const user = userEvent.setup();

    render(<App />);

    await logInUser();

    expect(
      screen.getByRole('table')
    ).toBeInTheDocument();

    await user.click(
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

    expect(
      screen.queryByRole('link', {
        name: /contact us/i,
      })
    ).not.toBeInTheDocument();
  });

  test('opens the notifications drawer', async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(
      screen.queryByRole('button', {
        name: /close/i,
      })
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByText(/your notifications/i)
    );

    expect(
      screen.getByRole('button', {
        name: /close/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /here is the list of notifications/i
      )
    ).toBeInTheDocument();
  });

  test('closes the notifications drawer', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByText(/your notifications/i)
    );

    const closeButton = screen.getByRole(
      'button',
      {
        name: /close/i,
      }
    );

    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);

    expect(
      screen.queryByRole('button', {
        name: /close/i,
      })
    ).not.toBeInTheDocument();
  });

  test('removes a notification and logs its id when clicked', async () => {
    const user = userEvent.setup();

    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    try {
      render(<App />);

      await user.click(
        screen.getByText(
          /your notifications/i
        )
      );

      const notification =
        screen.getByText(
          /new course available/i
        );

      expect(
        notification
      ).toBeInTheDocument();

      expect(
        screen.getAllByRole('listitem')
      ).toHaveLength(3);

      await user.click(notification);

      await waitFor(() => {
        expect(
          screen.queryByText(
            /new course available/i
          )
        ).not.toBeInTheDocument();
      });

      expect(
        screen.getAllByRole('listitem')
      ).toHaveLength(2);

      expect(
        consoleSpy
      ).toHaveBeenCalledWith(
        'Notification 1 has been marked as read'
      );
    } finally {
      consoleSpy.mockRestore();
    }
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

  test('logs out when control and h are pressed', async () => {
    const alertSpy = jest
      .spyOn(window, 'alert')
      .mockImplementation(() => {});

    try {
      render(<App />);

      await logInUser();

      expect(
        screen.getByRole('table')
      ).toBeInTheDocument();

      fireEvent.keyDown(document, {
        key: 'h',
        ctrlKey: true,
      });

      expect(
        alertSpy
      ).toHaveBeenCalledWith(
        'Logging you out'
      );

      await waitFor(() => {
        expect(
          screen.getByText(
            /login to access the full dashboard/i
          )
        ).toBeInTheDocument();
      });
    } finally {
      alertSpy.mockRestore();
    }
  });

  test('removes keyboard listener when unmounted', () => {
    const removeEventListenerSpy =
      jest.spyOn(
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
