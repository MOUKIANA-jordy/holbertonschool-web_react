import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
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
  test('always displays Your notifications', () => {
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

  test('does not display drawer when displayDrawer is false', () => {
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

  test('displays drawer and items when displayDrawer is true', () => {
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

  test('displays all notification texts', () => {
    render(
      <Notifications
        displayDrawer
        notifications={notificationsList}
      />
    );

    expect(
      screen.getByText(/new course available/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/new resume available/i)
    ).toBeInTheDocument();

    const urgentItem = screen
      .getByText(/urgent requirement/i)
      .closest('li');

    expect(urgentItem).toBeInTheDocument();

    expect(urgentItem).toHaveTextContent(
      /urgent requirement.*complete by EOD/i
    );
  });

  test('displays no new notification message for an empty list', () => {
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

  test('logs close message when close button is clicked', () => {
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(
      <Notifications
        displayDrawer
        notifications={notificationsList}
      />
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: /close/i,
      })
    );

    expect(consoleSpy).toHaveBeenCalledTimes(1);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Close button has been clicked'
    );

    consoleSpy.mockRestore();
  });

  test('logs notification id when a notification is clicked', () => {
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(
      <Notifications
        displayDrawer
        notifications={notificationsList}
      />
    );

    fireEvent.click(
      screen.getByText(/new course available/i)
    );

    expect(consoleSpy).toHaveBeenCalledTimes(1);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read'
    );

    consoleSpy.mockRestore();
  });

  test('does not re-render when notifications length remains the same', () => {
    const initialNotifications = [
      {
        id: 1,
        type: 'default',
        value: 'Initial notification',
      },
    ];

    const updatedNotifications = [
      {
        id: 1,
        type: 'urgent',
        value: 'Updated notification',
      },
    ];

    const { rerender } = render(
      <Notifications
        displayDrawer
        notifications={initialNotifications}
      />
    );

    expect(
      screen.getByText(/initial notification/i)
    ).toBeInTheDocument();

    rerender(
      <Notifications
        displayDrawer
        notifications={updatedNotifications}
      />
    );

    expect(
      screen.getByText(/initial notification/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByText(/updated notification/i)
    ).not.toBeInTheDocument();
  });

  test('re-renders when notifications length changes', () => {
    const initialNotifications = [
      {
        id: 1,
        type: 'default',
        value: 'First notification',
      },
    ];

    const updatedNotifications = [
      {
        id: 1,
        type: 'default',
        value: 'First notification',
      },
      {
        id: 2,
        type: 'urgent',
        value: 'Second notification',
      },
    ];

    const { rerender } = render(
      <Notifications
        displayDrawer
        notifications={initialNotifications}
      />
    );

    expect(
      screen.getAllByRole('listitem')
    ).toHaveLength(1);

    rerender(
      <Notifications
        displayDrawer
        notifications={updatedNotifications}
      />
    );

    expect(
      screen.getAllByRole('listitem')
    ).toHaveLength(2);

    expect(
      screen.getByText(/second notification/i)
    ).toBeInTheDocument();
  });
});
