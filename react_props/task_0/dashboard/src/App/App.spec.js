import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App component - entry point tests', () => {
  test('renders the App component correctly', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
