import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders all required notification elements', () => {
    const { container } = render(<Notifications />);

    expect(
      container.querySelector('.notification-items'),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Here is the list of notifications/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Close/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('img', { name: /Close/i }),
    ).toBeInTheDocument();

    const notifications = screen.getAllByRole('listitem');

    expect(notifications).toHaveLength(3);

    expect(
      screen.getByText(/New course available/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/New resume available/i),
    ).toBeInTheDocument();

    expect(notifications[2]).toHaveTextContent(
      /Urgent requirement.*complete by EOD/i,
    );
  });

  test('logs a message when the close button is clicked', () => {
    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(<Notifications />);

    fireEvent.click(
      screen.getByRole('button', { name: /Close/i }),
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'Close button has been clicked',
    );

    consoleSpy.mockRestore();
  });
});
