import React from 'react';
import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders a div with class notification-items', () => {
    const { container } = render(<Notifications />);
    const notificationDiv = container.querySelector('.notification-items');
    expect(notificationDiv).toBeInTheDocument();
  });

  test('renders paragraph with correct text', () => {
    render(<Notifications />);
    const paragraph = screen.getByText('Here is the list of notifications');
    expect(paragraph).toBeInTheDocument();
  });
});
