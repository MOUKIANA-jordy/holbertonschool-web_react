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

  test('calls handleDisplayDrawer when title is clicked', () => {
    const handleDisplayDrawer = jest.fn();

    render(
      <Notifications
        notifications={notificationsList}
        handleDisplayDrawer={
          handleDisplayDrawer
        }
      />
    );

    fireEvent.click(
      screen.getByText(/your notifications/i)
    );

    expect(
      handleDisplayDrawer
    ).toHaveBeenCalledTimes(1);
  });

  test('calls handleHideDrawer when close button is clicked', () => {
    const handleHideDrawer = jest.fn();

    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(
      <Notifications
        displayDrawer
        notifications={notificationsList}
        handleHideDrawer={handleHideDrawer}
      />
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: /close/i,
      })
    );

    expect(
      handleHideDrawer
    ).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
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
      screen.queryAllByRole('listitem')
    ).toHaveLength(0);
  });

  test('displays drawer and three items when opened', () => {
    render(
      <Notifications
        displayDrawer
        notifications={notificationsList}
      />
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

    expect(urgentItem).toHaveTextContent(
      /urgent requirement.*complete by EOD/i
    );
  });

  test('displays empty notification message', () => {
    render(
      <Notifications
        displayDrawer
        notifications={[]}
      />
    );

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

    expect(consoleSpy).toHaveBeenCalledWith(
      'Close button has been clicked'
    );

    consoleSpy.mockRestore();
  });

  test('calls markNotificationAsRead when an item is clicked', () => {
    const markNotificationAsRead = jest.fn();

    render(
      <Notifications
        displayDrawer
        notifications={notificationsList}
        markNotificationAsRead={
          markNotificationAsRead
        }
      />
    );

    fireEvent.click(
      screen.getByText(/new course available/i)
    );

    expect(
      markNotificationAsRead
    ).toHaveBeenCalledWith(1);
  });

  test('re-renders when the notifications prop changes', () => {
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

    rerender(
      <Notifications
        displayDrawer
        notifications={updatedNotifications}
      />
    );

    expect(
      screen.getByText(/updated notification/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByText(/initial notification/i)
    ).not.toBeInTheDocument();
  });

  test('re-renders when notification length changes', () => {
    const initialNotifications = [
      {
        id: 1,
        type: 'default',
        value: 'First notification',
      },
    ];

    const updatedNotifications = [
      ...initialNotifications,
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

    rerender(
      <Notifications
        displayDrawer
        notifications={updatedNotifications}
      />
    );

    expect(
      screen.getAllByRole('listitem')
    ).toHaveLength(2);
  });
});
