import mockAxios from 'jest-mock-axios';

import coursesReducer, {
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from '../courses/coursesSlice';

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

  test('Should add isSelected false to every course when fetchCourses is fulfilled', () => {
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

    const state = coursesReducer(
      undefined,
      fetchCourses.fulfilled(
        courses,
        'requestId'
      )
    );

    expect(state.courses).toEqual([
      {
        id: 1,
        name: 'ES6',
        credit: 60,
        isSelected: false,
      },
      {
        id: 2,
        name: 'Webpack',
        credit: 20,
        isSelected: false,
      },
      {
        id: 3,
        name: 'React',
        credit: 40,
        isSelected: false,
      },
    ]);

    state.courses.forEach((course) => {
      expect(course.isSelected).toBe(false);
    });
  });

  test('Should set isSelected to true when selectCourse is dispatched', () => {
    const initialState = {
      courses: [
        {
          id: 1,
          name: 'ES6',
          credit: 60,
          isSelected: false,
        },
        {
          id: 2,
          name: 'Webpack',
          credit: 20,
          isSelected: false,
        },
      ],
    };

    const state = coursesReducer(
      initialState,
      selectCourse(1)
    );

    expect(state.courses[0].isSelected).toBe(
      true
    );

    expect(state.courses[1].isSelected).toBe(
      false
    );
  });

  test('Should set isSelected to false when unSelectCourse is dispatched', () => {
    const initialState = {
      courses: [
        {
          id: 1,
          name: 'ES6',
          credit: 60,
          isSelected: true,
        },
        {
          id: 2,
          name: 'Webpack',
          credit: 20,
          isSelected: false,
        },
      ],
    };

    const state = coursesReducer(
      initialState,
      unSelectCourse(1)
    );

    expect(state.courses[0].isSelected).toBe(
      false
    );

    expect(state.courses[1].isSelected).toBe(
      false
    );
  });

  test('Should select the correct course using its id', () => {
    const initialState = {
      courses: [
        {
          id: 1,
          name: 'ES6',
          credit: 60,
          isSelected: false,
        },
        {
          id: 2,
          name: 'Webpack',
          credit: 20,
          isSelected: false,
        },
        {
          id: 3,
          name: 'React',
          credit: 40,
          isSelected: false,
        },
      ],
    };

    const state = coursesReducer(
      initialState,
      selectCourse(2)
    );

    expect(state.courses[0].isSelected).toBe(
      false
    );

    expect(state.courses[1].isSelected).toBe(
      true
    );

    expect(state.courses[2].isSelected).toBe(
      false
    );
  });

  test('Should unselect the correct course using its id', () => {
    const initialState = {
      courses: [
        {
          id: 1,
          name: 'ES6',
          credit: 60,
          isSelected: true,
        },
        {
          id: 2,
          name: 'Webpack',
          credit: 20,
          isSelected: true,
        },
        {
          id: 3,
          name: 'React',
          credit: 40,
          isSelected: true,
        },
      ],
    };

    const state = coursesReducer(
      initialState,
      unSelectCourse(2)
    );

    expect(state.courses[0].isSelected).toBe(
      true
    );

    expect(state.courses[1].isSelected).toBe(
      false
    );

    expect(state.courses[2].isSelected).toBe(
      true
    );
  });

  test('Should reset courses when logout action is dispatched', () => {
    const initialState = {
      courses: [
        {
          id: 1,
          name: 'ES6',
          credit: 60,
          isSelected: true,
        },
        {
          id: 2,
          name: 'Webpack',
          credit: 20,
          isSelected: false,
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
