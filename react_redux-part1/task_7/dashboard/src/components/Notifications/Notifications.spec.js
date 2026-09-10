import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Notifications from './Notifications';
import notificationsReducer from '../../features/notifications/notificationsSlice';

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
      __html:
        '<strong>Urgent requirement</strong>',
    },
  },
];

function renderWithStore({
  items = [],
  displayDrawer = false,
} = {}) {
  const store = configureStore({
    reducer: {
      notifications: notificationsReducer,
    },
    preloadedState: {
      notifications: {
        notifications: items,
        displayDrawer,
      },
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );

  return store;
}

describe('Notifications component', () => {
  test('renders the notification title', () => {
    renderWithStore();

    expect(
      screen.getByText('Your notifications')
    ).toBeInTheDocument();
  });

  test('does not display the drawer when displayDrawer is false', () => {
    renderWithStore({
      displayDrawer: false,
    });

    expect(
      screen.queryByRole('button', {
        name: /close/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        'Here is the list of notifications'
      )
    ).not.toBeInTheDocument();
  });

  test('displays the drawer when displayDrawer is true', () => {
    renderWithStore({
      items: notifications,
      displayDrawer: true,
    });

    expect(
      screen.getByRole('button', {
        name: /close/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Here is the list of notifications'
      )
    ).toBeInTheDocument();
  });

  test('renders all notification items', () => {
    const { container } = render(
      <Provider
        store={configureStore({
          reducer: {
            notifications: notificationsReducer,
          },
          preloadedState: {
            notifications: {
              notifications,
              displayDrawer: true,
            },
          },
        })}
      >
        <Notifications />
      </Provider>
    );

    expect(
      container.querySelectorAll(
        '[data-notification-type]'
      )
    ).toHaveLength(3);
  });

  test('displays the empty notification message', () => {
    renderWithStore({
      items: [],
      displayDrawer: true,
    });

    expect(
      screen.getByText(
        'No new notification for now'
      )
    ).toBeInTheDocument();
  });

  test('shows drawer when title is clicked', async () => {
    const user = userEvent.setup();

    const store = renderWithStore({
      displayDrawer: false,
    });

    await user.click(
      screen.getByText('Your notifications')
    );

    expect(
      store.getState().notifications.displayDrawer
    ).toBe(true);
  });

  test('shows drawer with Enter key', () => {
    const store = renderWithStore({
      displayDrawer: false,
    });

    fireEvent.keyDown(
      screen.getByText('Your notifications'),
      {
        key: 'Enter',
      }
    );

    expect(
      store.getState().notifications.displayDrawer
    ).toBe(true);
  });

  test('hides drawer when close button is clicked', async () => {
    const user = userEvent.setup();

    const store = renderWithStore({
      items: notifications,
      displayDrawer: true,
    });

    await user.click(
      screen.getByRole('button', {
        name: /close/i,
      })
    );

    expect(
      store.getState().notifications.displayDrawer
    ).toBe(false);
  });

  test('removes notification when notification is clicked', async () => {
    const user = userEvent.setup();

    const store = renderWithStore({
      items: notifications,
      displayDrawer: true,
    });

    await user.click(
      screen.getByText('New course available')
    );

    expect(
      store.getState().notifications.notifications
    ).toHaveLength(2);

    expect(
      store
        .getState()
        .notifications.notifications.find(
          (notification) => notification.id === 1
        )
    ).toBeUndefined();
  });

  test('adds animate-bounce when notifications exist and drawer is closed', () => {
    renderWithStore({
      items: notifications,
      displayDrawer: false,
    });

    expect(
      screen.getByText('Your notifications')
    ).toHaveClass('animate-bounce');
  });

  test('does not add animate-bounce when drawer is open', () => {
    renderWithStore({
      items: notifications,
      displayDrawer: true,
    });

    expect(
      screen.getByText('Your notifications')
    ).not.toHaveClass('animate-bounce');
  });
});
