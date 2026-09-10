import authReducer, {
  login,
  logout,
} from '../auth/authSlice';

describe('authSlice', () => {
  test('should return the initial state by default', () => {
    const state = authReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    });

    expect(state.user).toEqual({
      email: '',
      password: '',
    });

    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.isLoggedIn).toBe(false);

    expect(Object.keys(state).sort()).toEqual([
      'isLoggedIn',
      'user',
    ]);

    expect(Object.keys(state.user).sort()).toEqual([
      'email',
      'password',
    ]);
  });

  test('should update the state correctly with login action', () => {
    const startState = {
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    };

    const action = login({
      email: 'test@example.com',
      password: 'password123',
    });

    const state = authReducer(startState, action);

    expect(state).toEqual({
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    });

    expect(state.user.email).toBe('test@example.com');
    expect(state.user.password).toBe('password123');
    expect(state.isLoggedIn).toBe(true);
  });

  test('should reset the state correctly with logout action', () => {
    const startState = {
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    };

    const state = authReducer(startState, logout());

    expect(state).toEqual({
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    });

    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.isLoggedIn).toBe(false);
  });
});
