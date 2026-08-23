import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders a default notification in blue', () => {
    render(
      <NotificationItem
        id={1}
        type="default"
        value="New course available"
      />
    );

    const item = screen.getByText(
      /new course available/i
    );

    expect(item).toBeInTheDocument();
    expect(item.tagName.toLowerCase()).toBe('li');
    expect(item).toHaveAttribute(
      'data-notification-type',
      'default'
    );
  });

  test('renders an urgent notification in red', () => {
    render(
      <NotificationItem
        id={2}
        type="urgent"
        value="New resume available"
      />
    );

    const item = screen.getByText(
      /new resume available/i
    );

    expect(item).toBeInTheDocument();
    expect(item.tagName.toLowerCase()).toBe('li');
    expect(item).toHaveAttribute(
      'data-notification-type',
      'urgent'
    );
  });

  test('renders an HTML notification', () => {
    const html = {
      __html:
        '<strong>Urgent requirement</strong> - complete by EOD',
    };

    render(
      <NotificationItem
        id={3}
        type="urgent"
        html={html}
      />
    );

    const item = screen
      .getByText(/urgent requirement/i)
      .closest('li');

    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent(
      /urgent requirement.*complete by EOD/i
    );
  });

  test('calls markAsRead when notification is clicked', () => {
    const markAsRead = jest.fn();

    render(
      <NotificationItem
        id={1}
        type="default"
        value="New course available"
        markAsRead={markAsRead}
      />
    );

    fireEvent.click(
      screen.getByText(/new course available/i)
    );

    expect(markAsRead).toHaveBeenCalledTimes(1);
    expect(markAsRead).toHaveBeenCalledWith(1);
  });
});
