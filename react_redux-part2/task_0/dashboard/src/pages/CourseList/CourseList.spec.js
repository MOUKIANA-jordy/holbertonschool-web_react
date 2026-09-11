import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import CourseList from './CourseList';
import rootReducer from '../../app/rootReducer';

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

function renderWithStore(courses = []) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      auth: {
        user: {
          email: '',
          password: '',
        },
        isLoggedIn: false,
      },
      notifications: {
        notifications: [],
        displayDrawer: true,
      },
      courses: {
        courses,
      },
    },
  });

  return render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );
}

describe('CourseList component', () => {
  test('renders five rows when courses are provided', () => {
    renderWithStore(coursesList);

    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');

    expect(rows).toHaveLength(5);
  });

  test('renders course names and credits', () => {
    renderWithStore(coursesList);

    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();

    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  test('renders no course message when courses array is empty', () => {
    renderWithStore([]);

    expect(
      screen.getByText('No course available yet')
    ).toBeInTheDocument();

    const table = screen.getByRole('table');
    const rows = within(table).getAllByRole('row');

    expect(rows).toHaveLength(1);
  });
});
