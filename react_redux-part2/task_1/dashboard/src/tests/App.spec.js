import {
  act,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockAxios from 'axios';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from '../App';
import rootReducer from '../app/rootReducer';

const notifications = [
  {
    id: 1,
    type: 'default',
    value: 'New course available',
  },
  {
    id: 2,
    type: 'urgent',
    value: 'New resume available',
  },
  {
    id: 3,
    type: 'urgent',
    value: 'Old notification',
  },
];

const courses = [
  {
    id: 1,
    name: 'ES6',
    credit: 60,
  },
  {
    id: 2,
    name: 'Webpack',
    credit: 20,
  },
  {
    id: 3,
    name: 'React',
    credit: 40,
  },
];

function renderWithStore() {
  const store = configureStore({
    reducer: rootReducer,
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <App />
      </Provider>
    ),
  };
}

async function respondWithNotifications() {
  await act(async () => {
    mockAxios.mockResponse({
      data: notifications,
    });
  });
}

async function logIn() {
  const user = userEvent.setup();

  await user.type(
    screen.getByLabelText(/email/i),
    'jordy@example.com'
  );

  await user.type(
    screen.getByLabelText(/password/i),
    'password123'
  );

  await user.click(
    screen.getByDisplayValue('OK')
  );

  return user;
}

describe('App component', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders without crashing', () => {
    renderWithStore();

    expect(
      screen.getByText('School dashboard')
    ).toBeInTheDocument();
  });

  test('fetches notifications when App loads', async () => {
    renderWithStore();

    expect(mockAxios.get).toHaveBeenCalledWith(
      'http://localhost:5173/notifications.json'
    );

    await respondWithNotifications();

    expect(
      screen.getByText('New course available')
    ).toBeInTheDocument();

    expect(
      screen.getByText('New resume available')
    ).toBeInTheDocument();
  });

  test('uses getLatestNotification for notification 3', async () => {
    renderWithStore();

    await respondWithNotifications();

    expect(
      screen.getByText('Urgent requirement')
    ).toBeInTheDocument();

    expect(
      screen.getByText(/complete by EOD/i)
    ).toBeInTheDocument();
  });

  test('notification drawer is hidden by default', () => {
    const { container } = renderWithStore();

    const drawer =
      container.querySelector('.Notifications');

    expect(drawer).toBeInTheDocument();

    expect(
      screen.queryByRole('button', {
        name: /close/i,
      })
    ).not.toBeInTheDocument();
  });

  test('displays and hides the notification drawer', async () => {
    const user = userEvent.setup();

    renderWithStore();

    const notificationTitle =
      screen.getByText(/your notifications/i);

    expect(
      screen.queryByRole('button', {
        name: /close/i,
      })
    ).not.toBeInTheDocument();

    await user.click(notificationTitle);

    expect(
      screen.getByRole('button', {
        name: /close/i,
      })
    ).toBeInTheDocument();

    await user.click(
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

  test('renders the login form when logged out', () => {
    renderWithStore();

    expect(
      screen.getByRole('heading', {
        name: /log in to continue/i,
      })
    ).toBeInTheDocument();
  });

  test('fetches and displays courses after login', async () => {
    renderWithStore();

    await respondWithNotifications();

    await logIn();

    await waitFor(() => {
      expect(
        mockAxios.get
      ).toHaveBeenCalledWith(
        'http://localhost:5173/courses.json'
      );
    });

    await act(async () => {
      mockAxios.mockResponse({
        data: courses,
      });
    });

    expect(
      await screen.findByText('Webpack')
    ).toBeInTheDocument();

    expect(
      screen.getByText('React')
    ).toBeInTheDocument();

    expect(
      screen.getByText('ES6')
    ).toBeInTheDocument();
  });

  test('clears courses when the user logs out', async () => {
    const user = userEvent.setup();

    renderWithStore();

    await respondWithNotifications();

    await logIn();

    await waitFor(() => {
      expect(
        mockAxios.get
      ).toHaveBeenCalledWith(
        'http://localhost:5173/courses.json'
      );
    });

    await act(async () => {
      mockAxios.mockResponse({
        data: courses,
      });
    });

    expect(
      await screen.findByText('Webpack')
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('link', {
        name: /logout/i,
      })
    );

    expect(
      screen.getByRole('heading', {
        name: /log in to continue/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Webpack')
    ).not.toBeInTheDocument();
  });

  test('removes only the clicked notification', async () => {
    const user = userEvent.setup();

    renderWithStore();

    await respondWithNotifications();

    await user.click(
      screen.getByText('New course available')
    );

    expect(
      screen.queryByText('New course available')
    ).not.toBeInTheDocument();

    expect(
      screen.getByText('New resume available')
    ).toBeInTheDocument();
  });
});
