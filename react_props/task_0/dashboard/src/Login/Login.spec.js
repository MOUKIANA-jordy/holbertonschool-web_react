import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

test('renders Login without crashing', () => {
  const { container } = render(<Login />);
  expect(container).toBeInTheDocument();
});
