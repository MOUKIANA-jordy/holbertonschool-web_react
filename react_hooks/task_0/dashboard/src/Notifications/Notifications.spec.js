import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Notifications from './Notifications';

const notificationsList = [
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
        '<strong>Urgent requirement</strong> - complete by EOD',
    },
  },
];

describe('Notifications component', () => {
  test('renders Your notifications in all cases', () => {
    render(<Notifications />);

    expect(
      screen.getByText(/your notifications/i)
    ).toBeInTheDocument();
  });

  test('does not display drawer content by default', () => {
    render(
      <Notifications
        notifications={notificationsList}
      />
    );

    expect(
      screen.queryByRole('button', {
        name: /close/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        /here is the list of notifications/i
      )
    ).not.toBeInTheDocument();

    expect(
      screen.queryAllByRole('listitem')
    ).toHaveLength(0);
  });

  test('does not display drawer content when displayDrawer is false', () => {
    render(
      <Notifications
        displayDrawer={false}
        notifications={notificationsList}
      />
    );

    expect(
      screen.getByText(/your notifications/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', {
        name: /close/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        /here is the list of notifications/i
      )
    ).not.toBeInTheDocument();

    expect(
      screen.queryAllByRole('listitem')
    ).toHaveLength(0);
  });

  test('displays drawer content when displayDrawer is true', () => {
    render(
      <Notifications
        displayDrawer
        notifications={notificationsList}
      />
    );

    expect(
      screen.getByText(/your notifications/i)
    ).toBeInTheDocument();

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

    expect(
      screen.getAllByRole('listitem')
    ).toHaveLength(3);
  });

  test('displays the three notification texts', () => {
    render(
      <Notifications
        displayDrawer
        notifications={notificationsList}
      />
    );

    expect(
      screen.getByText(
        /new course available/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /new resume available/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /urgent requirement/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /complete by EOD/i
      )
    ).toBeInTheDocument();
  });

  test('displays empty notification message', () => {
    render(
      <Notifications
        displayDrawer
        notifications={[]}
      />
    );

    expect(
      screen.getByText(/your notifications/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /no new notification for now/i
      )
    ).toBeInTheDocument();

    expect(
      screen.queryAllByRole('listitem')
    ).toHaveLength(0);
  });

  test('calls handleDisplayDrawer when title is clicked', async () => {
    const user = userEvent.setup();
    const handleDisplayDrawer = jest.fn();

    render(
      <Notifications
        notifications={notificationsList}
        handleDisplayDrawer={
          handleDisplayDrawer
        }
      />
    );

    await user.click(
      screen.getByText(/your notifications/i)
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
        notifications={notificationsList}
        handleHideDrawer={
          handleHideDrawer
        }
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

  test('calls markNotificationAsRead with clicked notification id', async () => {
    const user = userEvent.setup();

    const markNotificationAsRead =
      jest.fn();

    render(
      <Notifications
        displayDrawer
        notifications={notificationsList}
        markNotificationAsRead={
          markNotificationAsRead
        }
      />
    );

    await user.click(
      screen.getByText(
        /new course available/i
      )
    );

    expect(
      markNotificationAsRead
    ).toHaveBeenCalledTimes(1);

    expect(
      markNotificationAsRead
    ).toHaveBeenCalledWith(1);
  });

  test('calls markNotificationAsRead with a non-zero-based id', async () => {
    const user = userEvent.setup();

    const markNotificationAsRead =
      jest.fn();

    render(
      <Notifications
        displayDrawer
        notifications={notificationsList}
        markNotificationAsRead={
          markNotificationAsRead
        }
      />
    );

    await user.click(
      screen.getByText(
        /new resume available/i
      )
    );

    expect(
      markNotificationAsRead
    ).toHaveBeenCalledWith(2);
  });

  test('adds bounce animation when drawer is closed and notifications exist', () => {
    const { container } = render(
      <Notifications
        displayDrawer={false}
        notifications={notificationsList}
      />
    );

    expect(
      container.querySelector(
        '.notification-title'
      )
    ).toHaveClass('animate-bounce');
  });

  test('does not add bounce animation when drawer is open', () => {
    const { container } = render(
      <Notifications
        displayDrawer
        notifications={notificationsList}
      />
    );

    expect(
      container.querySelector(
        '.notification-title'
      )
    ).not.toHaveClass('animate-bounce');
  });

  test('does not add bounce animation with empty notifications', () => {
    const { container } = render(
      <Notifications
        displayDrawer={false}
        notifications={[]}
      />
    );

    expect(
      container.querySelector(
        '.notification-title'
      )
    ).not.toHaveClass('animate-bounce');
  });

  test('updates when notifications prop changes', () => {
    const { rerender } = render(
      <Notifications
        displayDrawer
        notifications={notificationsList}
      />
    );

    expect(
      screen.getAllByRole('listitem')
    ).toHaveLength(3);

    rerender(
      <Notifications
        displayDrawer
        notifications={notificationsList.slice(
          1
        )}
      />
    );

    expect(
      screen.getAllByRole('listitem')
    ).toHaveLength(2);

    expect(
      screen.queryByText(
        /new course available/i
      )
    ).not.toBeInTheDocument();
  });
});
