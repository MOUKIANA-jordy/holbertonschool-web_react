import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { css } from 'aphrodite';

import Notifications, {
  areNotificationsPropsEqual,
  styles,
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

  test('drawer is hidden by default', () => {
    const { container } = render(
      <Notifications
        notifications={notifications}
        loading={false}
      />
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

    const { container } = render(
      <Notifications
        notifications={notifications}
        loading={false}
      />
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

    const { container } = render(
      <Notifications
        notifications={notifications}
        loading={false}
      />
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
    const { container } = render(
      <Notifications
        notifications={notifications}
        loading={false}
      />
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
    const { container } = render(
      <Notifications
        notifications={notifications}
        loading={false}
      />
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

    const { container } = render(
      <Notifications
        notifications={notifications}
        loading={false}
      />
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

  test('renders all notification items when loading is false', () => {
    const { container } = render(
      <Notifications
        notifications={notifications}
        loading={false}
      />
    );

    expect(
      container.querySelectorAll(
        '[data-notification-type]'
      )
    ).toHaveLength(3);
  });

  test('displays the empty notification message when loading is false', () => {
    render(
      <Notifications
        notifications={[]}
        loading={false}
      />
    );

    expect(
      screen.getByText(
        'No new notification for now'
      )
    ).toBeInTheDocument();
  });

  test('displays Loading... when loading is true', () => {
    render(
      <Notifications
        notifications={notifications}
        loading={true}
      />
    );

    expect(
      screen.getByText('Loading...')
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        'Here is the list of notifications'
      )
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        'New course available'
      )
    ).not.toBeInTheDocument();
  });

  test('does not display Loading... when loading is false', () => {
    render(
      <Notifications
        notifications={notifications}
        loading={false}
      />
    );

    expect(
      screen.queryByText('Loading...')
    ).not.toBeInTheDocument();

    expect(
      screen.getByText(
        'Here is the list of notifications'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'New course available'
      )
    ).toBeInTheDocument();
  });

  test('does not display empty message while loading', () => {
    render(
      <Notifications
        notifications={[]}
        loading={true}
      />
    );

    expect(
      screen.getByText('Loading...')
    ).toBeInTheDocument();

    expect(
      screen.queryByText(
        'No new notification for now'
      )
    ).not.toBeInTheDocument();
  });

  test('calls markNotificationAsRead with the notification id', async () => {
    const user = userEvent.setup();

    const markNotificationAsRead =
      jest.fn();

    render(
      <Notifications
        notifications={notifications}
        loading={false}
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

  test('memo comparison returns true when props are unchanged', () => {
    const markNotificationAsRead =
      jest.fn();

    const props = {
      notifications,
      loading: false,
      markNotificationAsRead,
    };

    expect(
      areNotificationsPropsEqual(
        props,
        props
      )
    ).toBe(true);
  });

  test('memo comparison returns true when all props have the same references and values', () => {
    const markNotificationAsRead =
      jest.fn();

    expect(
      areNotificationsPropsEqual(
        {
          notifications,
          loading: false,
          markNotificationAsRead,
        },
        {
          notifications,
          loading: false,
          markNotificationAsRead,
        }
      )
    ).toBe(true);
  });

  test('memo comparison returns false when notifications change', () => {
    const markNotificationAsRead =
      jest.fn();

    expect(
      areNotificationsPropsEqual(
        {
          notifications,
          loading: false,
          markNotificationAsRead,
        },
        {
          notifications:
            notifications.slice(1),
          loading: false,
          markNotificationAsRead,
        }
      )
    ).toBe(false);
  });

  test('memo comparison returns false when loading changes', () => {
    const markNotificationAsRead =
      jest.fn();

    expect(
      areNotificationsPropsEqual(
        {
          notifications,
          loading: false,
          markNotificationAsRead,
        },
        {
          notifications,
          loading: true,
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
          loading: false,
          markNotificationAsRead:
            jest.fn(),
        },
        {
          notifications,
          loading: false,
          markNotificationAsRead:
            jest.fn(),
        }
      )
    ).toBe(false);
  });
});
