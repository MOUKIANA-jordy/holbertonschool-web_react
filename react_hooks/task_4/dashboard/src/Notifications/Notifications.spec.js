import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Notifications, {
  areNotificationsPropsEqual,
} from './Notifications';

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

describe('Notifications component', () => {
  test('renders the notification title', () => {
    render(<Notifications />);

    expect(
      screen.getByText('Your notifications')
    ).toBeInTheDocument();
  });

  test('does not display the drawer by default', () => {
    render(<Notifications />);

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
    render(
      <Notifications
        displayDrawer
        notifications={notifications}
      />
    );

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
      <Notifications
        displayDrawer
        notifications={notifications}
      />
    );

    expect(
      container.querySelectorAll(
        '[data-notification-type]'
      )
    ).toHaveLength(3);
  });

  test('displays the empty notification message', () => {
    render(
      <Notifications
        displayDrawer
        notifications={[]}
      />
    );

    expect(
      screen.getByText(
        'No new notification for now'
      )
    ).toBeInTheDocument();
  });

  test('calls handleDisplayDrawer when title is clicked', async () => {
    const user = userEvent.setup();
    const handleDisplayDrawer = jest.fn();

    render(
      <Notifications
        handleDisplayDrawer={
          handleDisplayDrawer
        }
      />
    );

    await user.click(
      screen.getByText('Your notifications')
    );

    expect(
      handleDisplayDrawer
    ).toHaveBeenCalledTimes(1);
  });

  test('calls handleDisplayDrawer with Enter key', () => {
    const handleDisplayDrawer = jest.fn();

    render(
      <Notifications
        handleDisplayDrawer={
          handleDisplayDrawer
        }
      />
    );

    fireEvent.keyDown(
      screen.getByText('Your notifications'),
      {
        key: 'Enter',
      }
    );

    expect(
      handleDisplayDrawer
    ).toHaveBeenCalledTimes(1);
  });

  test('calls handleHideDrawer when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleHideDrawer = jest.fn();

    render(
      <Notifications
        displayDrawer
        notifications={notifications}
        handleHideDrawer={handleHideDrawer}
      />
    );

    await user.click(
      screen.getByRole('button', {
        name: /close/i,
      })
    );

    expect(
      handleHideDrawer
    ).toHaveBeenCalledTimes(1);
  });

  test('calls markNotificationAsRead with the notification id', async () => {
    const user = userEvent.setup();
    const markNotificationAsRead = jest.fn();

    render(
      <Notifications
        displayDrawer
        notifications={notifications}
        markNotificationAsRead={
          markNotificationAsRead
        }
      />
    );

    await user.click(
      screen.getByText('New course available')
    );

    expect(
      markNotificationAsRead
    ).toHaveBeenCalledWith(1);
  });

  test('adds animate-bounce when notifications exist and drawer is closed', () => {
    render(
      <Notifications
        notifications={notifications}
        displayDrawer={false}
      />
    );

    expect(
      screen.getByText('Your notifications')
    ).toHaveClass('animate-bounce');
  });

  test('does not add animate-bounce when drawer is open', () => {
    render(
      <Notifications
        notifications={notifications}
        displayDrawer
      />
    );

    expect(
      screen.getByText('Your notifications')
    ).not.toHaveClass('animate-bounce');
  });

  test('memo comparison returns true when props are unchanged', () => {
    const props = {
      notifications,
      displayDrawer: false,
      handleDisplayDrawer: jest.fn(),
      handleHideDrawer: jest.fn(),
      markNotificationAsRead: jest.fn(),
    };

    expect(
      areNotificationsPropsEqual(props, props)
    ).toBe(true);
  });

  test('memo comparison returns false when notifications change', () => {
    const sharedProps = {
      displayDrawer: false,
      handleDisplayDrawer: jest.fn(),
      handleHideDrawer: jest.fn(),
      markNotificationAsRead: jest.fn(),
    };

    expect(
      areNotificationsPropsEqual(
        {
          ...sharedProps,
          notifications,
        },
        {
          ...sharedProps,
          notifications: notifications.slice(1),
        }
      )
    ).toBe(false);
  });

  test('memo comparison returns false when displayDrawer changes', () => {
    const sharedProps = {
      notifications,
      handleDisplayDrawer: jest.fn(),
      handleHideDrawer: jest.fn(),
      markNotificationAsRead: jest.fn(),
    };

    expect(
      areNotificationsPropsEqual(
        {
          ...sharedProps,
          displayDrawer: false,
        },
        {
          ...sharedProps,
          displayDrawer: true,
        }
      )
    ).toBe(false);
  });
});
