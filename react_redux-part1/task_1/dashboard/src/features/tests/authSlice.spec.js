import authReducer, {
  login,
  logout,
} from '../auth/authSlice';

describe('authSlice', () => {
  test('Should return the initial state by default', () => {
    expect(authReducer(undefined, {})).toEqual({
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    });
  });

  test('Should update the state correctly with login action', () => {
    const previousState = {
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    };

    expect(
      authReducer(
        previousState,
        login({
          email: 'test@example.com',
          password: 'password123',
        })
      )
    ).toEqual({
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    });
  });

  test('Should reset the state correctly with logout action', () => {
    const previousState = {
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    };

    expect(authReducer(previousState, logout())).toEqual({
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    });
  });
});
