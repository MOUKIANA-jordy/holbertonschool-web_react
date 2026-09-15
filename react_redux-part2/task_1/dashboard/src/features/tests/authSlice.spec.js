import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  test('Should return the initial state by default', () => {
    const state = authReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    });
  });

  test('Should update the state correctly with login action', () => {
    const state = authReducer(
      {
        user: {
          email: '',
          password: '',
        },
        isLoggedIn: false,
      },
      login({
        email: 'test@example.com',
        password: 'password123',
      })
    );

    expect(state).toEqual({
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    });
  });

  test('Should reset the state correctly with logout action', () => {
    const state = authReducer(
      {
        user: {
          email: 'test@example.com',
          password: 'password123',
        },
        isLoggedIn: true,
      },
      logout()
    );

    expect(state).toEqual({
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    });
  });
});
