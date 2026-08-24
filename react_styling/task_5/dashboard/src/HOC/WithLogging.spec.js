import React from 'react';
import {
  cleanup,
  render,
  screen,
} from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return (
      <h1>
        Hello from Mock App Component
      </h1>
    );
  }
}

const LoggedMockApp = WithLogging(MockApp);

describe('WithLogging HOC', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    consoleSpy.mockRestore();
  });

  test('renders the wrapped component', () => {
    render(<LoggedMockApp />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /hello from mock app component/i,
      })
    ).toBeInTheDocument();
  });

  test('logs when the wrapped component is mounted', () => {
    render(<LoggedMockApp />);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Component MockApp is mounted'
    );
  });

  test('logs when the wrapped component is going to unmount', () => {
    const { unmount } = render(<LoggedMockApp />);

    unmount();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Component MockApp is going to unmount'
    );
  });

  test('sets the correct displayName', () => {
    expect(LoggedMockApp.displayName).toBe(
      'WithLogging(MockApp)'
    );
  });
});
