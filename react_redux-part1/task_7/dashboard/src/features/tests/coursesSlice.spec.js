import mockAxios from 'jest-mock-axios';
import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';

describe('coursesSlice', () => {
  afterEach(() => {
    mockAxios.reset();
    jest.clearAllMocks();
  });

  test('Should return the initial state by default', () => {
    const state = coursesReducer(undefined, {
      type: 'unknown',
    });

    expect(state).toEqual({
      courses: [],
    });
  });

  test('Should fetch courses data correctly', async () => {
    const courses = [
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

    const dispatch = jest.fn();
    const getState = jest.fn(() => ({}));

    const promise = fetchCourses()(
      dispatch,
      getState,
      undefined
    );

    mockAxios.mockResponse({
      data: courses,
    });

    const result = await promise;

    expect(mockAxios.get).toHaveBeenCalledWith(
      'http://localhost:5173/courses.json'
    );

    expect(result.payload).toEqual(courses);
  });

  test('Should reset courses when logout action is dispatched', () => {
    const initialState = {
      courses: [
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
      ],
    };

    const state = coursesReducer(
      initialState,
      logout()
    );

    expect(state).toEqual({
      courses: [],
    });
  });
});
