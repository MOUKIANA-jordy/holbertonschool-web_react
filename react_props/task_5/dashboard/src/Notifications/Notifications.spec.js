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
  test('always displays the notification title', () => {
    render(<Notifications />);

    expect(
      screen.getByText(/your notifications/i)
    ).toBeInTheDocument();
  });

  test('does not display the drawer when displayDrawer is false', () => {
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
      screen.queryByRole('button', { name: /close/i })
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

  test('does not display the drawer by default', () => {
    render(
      <Notifications notifications={notificationsList} />
    );

    expect(
      screen.getByText(/your notifications/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /close/i })
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

  test('displays the drawer when displayDrawer is true', () => {
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
      screen.getByRole('button', { name: /close/i })
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

  test('displays all notification texts when drawer is visible', () => {
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

  test('displays no new notification message when list is empty', () => {
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
      screen.getByText(/no new notification for now/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /close/i })
    ).toBeInTheDocument();

    expect(
      screen.queryAllByRole('listitem')
    ).toHaveLength(0);
  });

  test('logs a message when the close button is clicked', () => {
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
      screen.getByRole('button', { name: /close/i })
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'Close button has been clicked'
    );

    consoleSpy.mockRestore();
  });
});
