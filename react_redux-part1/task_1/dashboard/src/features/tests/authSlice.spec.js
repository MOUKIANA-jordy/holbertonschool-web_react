import authReducer, {
  login,
  logout,
} from '../auth/authSlice';

describe('authSlice', () => {
  test('should return the initial state by default', () => {
    const expectedState = {
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    };

    expect(
      authReducer(undefined, { type: 'unknown' })
    ).toEqual(expectedState);
  });

  test('should update the state correctly with login action', () => {
    const initialState = {
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    };

    const payload = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = authReducer(
      initialState,
      login(payload)
    );

    expect(result).toEqual({
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    });
  });

  test('should reset the state correctly with logout action', () => {
    const loggedInState = {
      user: {
        email: 'john@example.com',
        password: 'secret123',
      },
      isLoggedIn: true,
    };

    const result = authReducer(
      loggedInState,
      logout()
    );

    expect(result).toEqual({
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    });
  });
});
