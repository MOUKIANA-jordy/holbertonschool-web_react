import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { css } from 'aphrodite';

import Notifications, {
  areNotificationsPropsEqual,
  styles,
} from './Notifications';

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
      __html: '<strong>Urgent requirement</strong>',
    },
  },
];

function renderWithStore(
  component,
  {
    loading = false,
    notificationList = [],
  } = {}
) {
  const store = configureStore({
    reducer: {
      notifications: notificationsReducer,
    },
    preloadedState: {
      notifications: {
        notifications: notificationList,
        loading,
      },
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        {component}
      </Provider>
    ),
  };
}

describe('Notifications component', () => {
  test('renders the notification title', () => {
    renderWithStore(<Notifications />);

    expect(
      screen.getByText('Your notifications')
    ).toBeInTheDocument();
  });

  test('drawer is hidden by default', () => {
    const { container } = renderWithStore(
      <Notifications notifications={notifications} />
    );

    const drawer =
      container.querySelector('.Notifications');

    expect(drawer).toBeInTheDocument();

    expect(drawer).not.toHaveClass(
      css(styles.visible)
    );
  });

  test('displays the drawer when notification title is clicked', async () => {
    const user = userEvent.setup();

    const { container } = renderWithStore(
      <Notifications notifications={notifications} />
    );

    const drawer =
      container.querySelector('.Notifications');

    await user.click(
      screen.getByText('Your notifications')
    );

    expect(drawer).toHaveClass(
      css(styles.visible)
    );
  });

  test('hides the drawer when title is clicked twice', async () => {
    const user = userEvent.setup();

    const { container } = renderWithStore(
      <Notifications notifications={notifications} />
    );

    const drawer =
      container.querySelector('.Notifications');

    const title = screen.getByText(
      'Your notifications'
    );

    await user.click(title);

    expect(drawer).toHaveClass(
      css(styles.visible)
    );

    await user.click(title);

    expect(drawer).not.toHaveClass(
      css(styles.visible)
    );
  });

  test('toggles the drawer with Enter key', () => {
    const { container } = renderWithStore(
      <Notifications notifications={notifications} />
    );

    const drawer =
      container.querySelector('.Notifications');

    const title = screen.getByText(
      'Your notifications'
    );

    fireEvent.keyDown(title, {
      key: 'Enter',
    });

    expect(drawer).toHaveClass(
      css(styles.visible)
    );

    fireEvent.keyDown(title, {
      key: 'Enter',
    });

    expect(drawer).not.toHaveClass(
      css(styles.visible)
    );
  });

  test('toggles the drawer with Space key', () => {
    const { container } = renderWithStore(
      <Notifications notifications={notifications} />
    );

    const drawer =
      container.querySelector('.Notifications');

    const title = screen.getByText(
      'Your notifications'
    );

    fireEvent.keyDown(title, {
      key: ' ',
    });

    expect(drawer).toHaveClass(
      css(styles.visible)
    );
  });

  test('close button hides the drawer', async () => {
    const user = userEvent.setup();

    const { container } = renderWithStore(
      <Notifications notifications={notifications} />
    );

    const drawer =
      container.querySelector('.Notifications');

    await user.click(
      screen.getByText('Your notifications')
    );

    expect(drawer).toHaveClass(
      css(styles.visible)
    );

    await user.click(
      screen.getByRole('button', {
        name: /close/i,
      })
    );

    expect(drawer).not.toHaveClass(
      css(styles.visible)
    );
  });

  test('renders all notification items', () => {
    const { container } = renderWithStore(
      <Notifications notifications={notifications} />
    );

    expect(
      container.querySelectorAll(
        '[data-notification-type]'
      )
    ).toHaveLength(3);
  });

  test('displays the empty notification message', () => {
    renderWithStore(
      <Notifications notifications={[]} />
    );

    expect(
      screen.getByText(
        'No new notification for now'
      )
    ).toBeInTheDocument();
  });

  test('calls markNotificationAsRead with the notification id', async () => {
    const user = userEvent.setup();

    const markNotificationAsRead = jest.fn();

    renderWithStore(
      <Notifications
        notifications={notifications}
        markNotificationAsRead={
          markNotificationAsRead
        }
      />
    );

    await user.click(
      screen.getByText(
        'New course available'
      )
    );

    expect(
      markNotificationAsRead
    ).toHaveBeenCalledWith(1);
  });

  test('displays Loading... when loading is true', () => {
    renderWithStore(
      <Notifications notifications={notifications} />,
      {
        loading: true,
        notificationList: notifications,
      }
    );

    expect(
      screen.getByText('Loading...')
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        'Here is the list of notifications'
      )
    ).not.toBeInTheDocument();
  });

  test('does not display Loading... when loading is false', () => {
    renderWithStore(
      <Notifications notifications={notifications} />,
      {
        loading: false,
        notificationList: notifications,
      }
    );

    expect(
      screen.queryByText('Loading...')
    ).not.toBeInTheDocument();

    expect(
      screen.getByText(
        'Here is the list of notifications'
      )
    ).toBeInTheDocument();
  });

  test('memo comparison returns true when props are unchanged', () => {
    const props = {
      notifications,
      markNotificationAsRead: jest.fn(),
    };

    expect(
      areNotificationsPropsEqual(
        props,
        props
      )
    ).toBe(true);
  });

  test('memo comparison returns false when notifications change', () => {
    const markNotificationAsRead = jest.fn();

    expect(
      areNotificationsPropsEqual(
        {
          notifications,
          markNotificationAsRead,
        },
        {
          notifications:
            notifications.slice(1),
          markNotificationAsRead,
        }
      )
    ).toBe(false);
  });

  test('memo comparison returns false when markNotificationAsRead changes', () => {
    expect(
      areNotificationsPropsEqual(
        {
          notifications,
          markNotificationAsRead:
            jest.fn(),
        },
        {
          notifications,
          markNotificationAsRead:
            jest.fn(),
        }
      )
    ).toBe(false);
  });
});
