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
  test('renders the notifications title', () => {
    render(
      <Notifications notifications={notificationsList} />
    );

    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();
  });

  test('renders the close button', () => {
    render(
      <Notifications notifications={notificationsList} />
    );

    expect(
      screen.getByRole('button', { name: /close/i })
    ).toBeInTheDocument();
  });

  test('renders three notification items', () => {
    render(
      <Notifications notifications={notificationsList} />
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('renders the correct text for every notification', () => {
    render(
      <Notifications notifications={notificationsList} />
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

  test('logs a message when the close button is clicked', () => {
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(
      <Notifications notifications={notificationsList} />
    );

    const closeButton = screen.getByRole('button', {
      name: /close/i,
    });

    fireEvent.click(closeButton);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Close button has been clicked'
    );

    consoleSpy.mockRestore();
  });

  test('renders without crashing when notifications are not passed', () => {
    render(<Notifications />);

    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
