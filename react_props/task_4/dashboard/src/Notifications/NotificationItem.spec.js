import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders a default notification with blue color', () => {
    render(
      <NotificationItem
        type="default"
        value="New course available"
      />
    );

    const notificationItem = screen.getByText(
      /new course available/i
    );

    expect(notificationItem).toBeInTheDocument();
    expect(notificationItem.tagName.toLowerCase()).toBe('li');
    expect(notificationItem).toHaveStyle({ color: 'blue' });
    expect(notificationItem).toHaveAttribute(
      'data-notification-type',
      'default'
    );
  });

  test('renders an urgent notification with red color', () => {
    render(
      <NotificationItem
        type="urgent"
        value="New resume available"
      />
    );

    const notificationItem = screen.getByText(
      /new resume available/i
    );

    expect(notificationItem).toBeInTheDocument();
    expect(notificationItem.tagName.toLowerCase()).toBe('li');
    expect(notificationItem).toHaveStyle({ color: 'red' });
    expect(notificationItem).toHaveAttribute(
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
        type="urgent"
        html={html}
      />
    );

    const notificationItem = screen.getByText(
      /urgent requirement/i
    ).closest('li');

    expect(notificationItem).toBeInTheDocument();
    expect(notificationItem).toHaveStyle({ color: 'red' });
    expect(notificationItem).toHaveAttribute(
      'data-notification-type',
      'urgent'
    );
    expect(notificationItem).toHaveTextContent(
      /urgent requirement.*complete by EOD/i
    );
  });
});
