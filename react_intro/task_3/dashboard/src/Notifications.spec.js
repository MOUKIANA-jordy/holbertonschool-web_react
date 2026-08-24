import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders the notifications title', () => {
    render(<Notifications />);

    expect(
      screen.getByText(/here is the list of notifications/i),
    ).toBeInTheDocument();
  });

  test('renders the close button and its image', () => {
    render(<Notifications />);

    expect(
      screen.getByRole('button', { name: /close/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('img', { name: /close/i }),
    ).toBeInTheDocument();
  });

  test('renders all three required notifications', () => {
    render(<Notifications />);

    const notifications = screen.getAllByRole('listitem');

    expect(notifications).toHaveLength(3);

    expect(
      screen.getByText(/new course available/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/new resume available/i),
    ).toBeInTheDocument();

    expect(notifications[2]).toHaveTextContent(
      /urgent requirement.*complete by eod/i,
    );
  });

  test('renders the correct notification priorities', () => {
    render(<Notifications />);

    const notifications = screen.getAllByRole('listitem');

    expect(notifications[0]).toHaveAttribute(
      'data-priority',
      'default',
    );

    expect(notifications[1]).toHaveAttribute(
      'data-priority',
      'urgent',
    );

    expect(notifications[2]).toHaveAttribute(
      'data-priority',
      'urgent',
    );
  });

  test('logs a message when the close button is clicked', () => {
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(<Notifications />);

    fireEvent.click(
      screen.getByRole('button', { name: /close/i }),
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'Close button has been clicked',
    );

    consoleSpy.mockRestore();
  });
});
