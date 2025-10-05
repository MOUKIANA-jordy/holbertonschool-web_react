import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
  test('renders the title', () => {
    render(<Header />);
    expect(screen.getByRole('heading', { name: /school dashboard/i })).toBeInTheDocument();
  });

  test('renders the Holberton logo with alt text', () => {
    render(<Header />);
    const img = screen.getByAltText(/holberton logo/i);
    expect(img).toBeInTheDocument();
    // optional: ensure it’s inside the correct container
    expect(img.closest('.App-header')).toBeInTheDocument();
  });
});
