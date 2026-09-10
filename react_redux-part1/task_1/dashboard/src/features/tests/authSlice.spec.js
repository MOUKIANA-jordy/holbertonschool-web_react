import authReducer, {
  initialState,
  login,
  logout,
} from '../auth/authSlice';

describe('authSlice', () => {
  test('returns the correct initial state by default', () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  test('updates state correctly when login is dispatched', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const state = authReducer(initialState, login(credentials));

    expect(state).toEqual({
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    });
  });

  test('resets state correctly when logout is dispatched', () => {
    const loggedInState = {
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    };

    const state = authReducer(loggedInState, logout());

    expect(state).toEqual({
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    });
  });
});
