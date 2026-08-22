import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('renders without crashing', () => {
    const { container } = render(<Header />);

    expect(container).toBeInTheDocument();
  });
});
