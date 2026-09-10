import authReducer, {
  login,
  logout,
} from '../auth/authSlice.js';

describe('authSlice', () => {
  test('Should return the initial state by default', () => {
    const state = authReducer(undefined, { type: '@@redux/INIT' });

    expect(state).toStrictEqual({
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    });

    expect(typeof state.user.email).toBe('string');
    expect(typeof state.user.password).toBe('string');
    expect(typeof state.isLoggedIn).toBe('boolean');
  });

  test('Should update the state correctly with login action', () => {
    const state = authReducer(
      undefined,
      login({
        email: 'test@example.com',
        password: 'password123',
      })
    );

    expect(state).toStrictEqual({
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

    expect(state).toStrictEqual({
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    });
  });
});
