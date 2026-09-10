import {
  act,
  render,
  screen,
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
    html: {
      __html: '',
    },
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

function createTestStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

function renderWithStore(preloadedState) {
  const store = createTestStore(
    preloadedState || {
      auth: {
        user: {
          email: '',
          password: '',
        },
        isLoggedIn: false,
      },
      notifications: {
        notifications: [],
        displayDrawer: true,
      },
      courses: {
        courses: [],
      },
    }
  );

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

  test('renders Login when user is logged out', () => {
    renderWithStore({
      auth: {
        user: {
          email: '',
          password: '',
        },
        isLoggedIn: false,
      },
      notifications: {
        notifications: [],
        displayDrawer: true,
      },
      courses: {
        courses: [],
      },
    });

    expect(
      screen.getByRole('heading', {
        name: /log in to continue/i,
      })
    ).toBeInTheDocument();
  });

  test('renders CourseList when user is logged in', () => {
    renderWithStore({
      auth: {
        user: {
          email: 'test@example.com',
          password: 'password123',
        },
        isLoggedIn: true,
      },
      notifications: {
        notifications: [],
        displayDrawer: true,
      },
      courses: {
        courses,
      },
    });

    expect(
      screen.getByRole('heading', {
        name: /course list/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText('Webpack')
    ).toBeInTheDocument();

    expect(
      screen.getByText('React')
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

  test('renders the notification drawer by default', () => {
    renderWithStore();

    expect(
      screen.getByRole('button', {
        name: /close/i,
      })
    ).toBeInTheDocument();
  });

  test('hides and displays the notification drawer', async () => {
    const user = userEvent.setup();

    renderWithStore();

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

    await user.click(
      screen.getByText(/your notifications/i)
    );

    expect(
      screen.getByRole('button', {
        name: /close/i,
      })
    ).toBeInTheDocument();
  });

  test('fetches and displays courses after login', async () => {
    renderWithStore();

    await respondWithNotifications();

    await logIn();

    expect(mockAxios.get).toHaveBeenCalledWith(
      'http://localhost:5173/courses.json'
    );

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
  });

  test('clears courses when the user logs out', async () => {
    renderWithStore();

    await respondWithNotifications();

    const user = await logIn();

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
