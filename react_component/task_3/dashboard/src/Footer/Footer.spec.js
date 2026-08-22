import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

test('renders Footer without crashing', () => {
  const { container } = render(<Footer />);
  expect(container).toBeInTheDocument();
});
