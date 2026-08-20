import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component tests', () => {
  test('checks the existence of the notifications title "Here is the list of notifications"', () => {
    render(<Notifications />);

    // Use case-insensitive regex to find the title
    const titleElement = screen.getByText(/here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('checks the existence of the button element in the notifications', () => {
    render(<Notifications />);

    // Check for button element with Close aria-label
    const buttonElement = screen.getByRole('button', { name: /close/i });
    expect(buttonElement).toBeInTheDocument();

    // Also check by aria-label directly
    const buttonByAriaLabel = screen.getByLabelText(/close/i);
    expect(buttonByAriaLabel).toBeInTheDocument();
  });

  test('verifies that there are 3 li elements as notifications rendered', () => {
    render(<Notifications />);

    // Get all list items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);

    // Verify the content of each list item (case-insensitive)
    expect(screen.getByText(/new course available/i)).toBeInTheDocument();
    expect(screen.getByText(/new resume available/i)).toBeInTheDocument();

    // Check for the urgent requirement notification (contains HTML)
    const urgentItem = screen.getByText(/urgent requirement/i);
    expect(urgentItem).toBeInTheDocument();
  });

  test('checks whether clicking the close button logs "Close button has been clicked" to the console', () => {
    // Mock console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<Notifications />);

    // Find the close button
    const closeButton = screen.getByRole('button', { name: /close/i });

    // Click the button using fireEvent
    fireEvent.click(closeButton);

    // Verify console.log was called with the correct message
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');

    // Clean up the mock
    consoleSpy.mockRestore();
  });

  test('verifies button contains an image element', () => {
    render(<Notifications />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    const imageElement = closeButton.querySelector('img');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src');
    expect(imageElement).toHaveAttribute('alt', 'close');
  });

  test('verifies notifications have correct priority data attributes', () => {
    render(<Notifications />);

    const listItems = screen.getAllByRole('listitem');

    // Check data-priority attributes
    expect(listItems[0]).toHaveAttribute('data-priority', 'default');
    expect(listItems[1]).toHaveAttribute('data-priority', 'urgent');
    // Third item should not have data-priority (it uses dangerouslySetInnerHTML)
  });
});
