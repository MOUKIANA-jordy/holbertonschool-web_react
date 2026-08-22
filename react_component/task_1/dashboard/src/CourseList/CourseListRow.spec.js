import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow component', () => {
  test('renders one header cell with colspan 2', () => {
    render(
      <table>
        <thead>
          <CourseListRow
            isHeader
            textFirstCell="Available courses"
          />
        </thead>
      </table>
    );

    const header = screen.getByRole('columnheader');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/available courses/i);
    expect(header).toHaveAttribute('colspan', '2');
  });

  test('renders two header cells when second cell is provided', () => {
    render(
      <table>
        <thead>
          <CourseListRow
            isHeader
            textFirstCell="Course name"
            textSecondCell="Credit"
          />
        </thead>
      </table>
    );

    const headers = screen.getAllByRole('columnheader');

    expect(headers).toHaveLength(2);
    expect(headers[0]).toHaveTextContent(/course name/i);
    expect(headers[1]).toHaveTextContent(/credit/i);
  });

  test('renders two td elements inside a tr', () => {
    render(
      <table>
        <tbody>
          <CourseListRow
            textFirstCell="ES6"
            textSecondCell={60}
          />
        </tbody>
      </table>
    );

    const row = screen.getByRole('row');
    const cells = within(row).getAllByRole('cell');

    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveTextContent(/es6/i);
    expect(cells[1]).toHaveTextContent('60');
  });
});
