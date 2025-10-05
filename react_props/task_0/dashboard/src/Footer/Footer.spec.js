import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
  test('renders copyright with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();

    const p = screen.getByText(/copyright/i);
    expect(p).toBeInTheDocument();
    expect(p).toHaveTextContent(year);
    // Don’t over-specify getFooterCopy(false); we just ensure visible text is correct
  });
});
