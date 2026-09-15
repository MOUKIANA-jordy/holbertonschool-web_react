import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <NotificationItem
        id={1}
        type="default"
        value="New course available"
      />
    );

    expect(container.querySelector('li')).toBeInTheDocument();
  });

  test('renders the notification value', () => {
    render(
      <NotificationItem
        id={1}
        type="default"
        value="New course available"
      />
    );

    expect(
      screen.getByText('New course available')
    ).toBeInTheDocument();
  });

  test('renders the correct notification type', () => {
    const { container } = render(
      <NotificationItem
        id={2}
        type="urgent"
        value="New resume available"
      />
    );

    expect(
      container.querySelector('li')
    ).toHaveAttribute(
      'data-notification-type',
      'urgent'
    );
  });

  test('renders HTML notification content', () => {
    render(
      <NotificationItem
        id={3}
        type="urgent"
        html={{
          __html:
            '<strong>Urgent requirement</strong>',
        }}
      />
    );

    expect(
      screen.getByText('Urgent requirement')
    ).toBeInTheDocument();
  });

  test('calls markAsRead with the notification id', async () => {
    const user = userEvent.setup();
    const markAsRead = jest.fn();

    render(
      <NotificationItem
        id={7}
        type="default"
        value="Test notification"
        markAsRead={markAsRead}
      />
    );

    await user.click(
      screen.getByText('Test notification')
    );

    expect(markAsRead).toHaveBeenCalledTimes(1);
    expect(markAsRead).toHaveBeenCalledWith(7);
  });
});
