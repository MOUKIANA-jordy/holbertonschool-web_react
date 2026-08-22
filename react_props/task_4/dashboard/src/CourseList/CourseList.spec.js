import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import CourseList from './CourseList';

const coursesList = [
  {
    id: 1,
    name: 'ES6',
    credit: 60,
  },
  {
    id: 2,
    name: 'Webpack',
    credit: 20,
  },
  {
    id: 3,
    name: 'React',
    credit: 40,
  },
];

describe('CourseList component', () => {
  test('renders five rows when courses are provided', () => {
    render(<CourseList courses={coursesList} />);

    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');

    expect(rows).toHaveLength(5);
    expect(screen.getByText(/^ES6$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Webpack$/i)).toBeInTheDocument();
    expect(screen.getByText(/^React$/i)).toBeInTheDocument();
  });

  test('renders one row in tbody when courses array is empty', () => {
    render(<CourseList courses={[]} />);

    const table = screen.getByRole('table');
    const tableBody = table.querySelector('tbody');
    const rows = within(tableBody).getAllByRole('row');

    expect(rows).toHaveLength(1);
    expect(
      screen.getByText(/no course available yet/i)
    ).toBeInTheDocument();
  });
});
