import {
  useEffect,
  useReducer,
} from 'react';
import axios from 'axios';

import appReducer, {
  APP_ACTIONS,
  initialState,
} from './appReducer';
import useLogin from './hooks/useLogin';
import {
  getCurrentYear,
  getFooterCopy,
  getLatestNotification,
} from './utils/utils';

function Login({ onLogin = () => {} }) {
  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  } = useLogin(onLogin);

  return (
    <form onSubmit={handleLoginSubmit}>
      <p>
        Login to access the full dashboard
      </p>

      <label htmlFor="email">
        Email
      </label>

      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={handleChangeEmail}
      />

      <label htmlFor="password">
        Password
      </label>

      <input
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={handleChangePassword}
      />

      <input
        type="submit"
        value="OK"
        disabled={!enableSubmit}
      />
    </form>
  );
}

export default function App() {
  const [state, dispatch] = useReducer(
    appReducer,
    initialState
  );

  const {
    displayDrawer,
    user,
    notifications,
    courses,
  } = state;

  useEffect(() => {
    let active = true;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          '/notifications.json'
        );

        const data = Array.isArray(
          response.data
        )
          ? response.data
          : response.data.notifications;

        const loadedNotifications = data.map(
          (notification) =>
            notification.id === 3
              ? {
                  ...notification,
                  html: {
                    __html:
                      getLatestNotification(),
                  },
                }
              : notification
        );

        if (active) {
          dispatch({
            type:
              APP_ACTIONS.SET_NOTIFICATIONS,
            payload: loadedNotifications,
          });
        }
      } catch (error) {
        console.error(
          'Error fetching notifications:',
          error
        );
      }
    };

    fetchNotifications();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          '/courses.json'
        );

        const data = Array.isArray(
          response.data
        )
          ? response.data
          : response.data.courses;

        if (active) {
          dispatch({
            type: APP_ACTIONS.SET_COURSES,
            payload: data,
          });
        }
      } catch (error) {
        console.error(
          'Error fetching courses:',
          error
        );
      }
    };

    if (user.isLoggedIn) {
      fetchCourses();
    }

    return () => {
      active = false;
    };
  }, [user.isLoggedIn]);

  const logIn = (email, password) => {
    dispatch({
      type: APP_ACTIONS.LOGIN,
      payload: {
        email,
        password,
      },
    });
  };

  const logOut = (event) => {
    event.preventDefault();

    dispatch({
      type: APP_ACTIONS.LOGOUT,
    });
  };

  const handleDisplayDrawer = () => {
    dispatch({
      type: APP_ACTIONS.SET_DRAWER,
      payload: true,
    });
  };

  const handleHideDrawer = () => {
    dispatch({
      type: APP_ACTIONS.SET_DRAWER,
      payload: false,
    });
  };

  const markNotificationAsRead = (id) => {
    dispatch({
      type:
        APP_ACTIONS.MARK_NOTIFICATION_READ,
      payload: id,
    });
  };

  return (
    <div>
      <div
        className="menuItem"
        role="button"
        tabIndex={0}
        onClick={handleDisplayDrawer}
        onKeyDown={(event) => {
          if (
            event.key === 'Enter' ||
            event.key === ' '
          ) {
            handleDisplayDrawer();
          }
        }}
      >
        Your notifications
      </div>

      {displayDrawer && (
        <div className="Notifications">
          <button
            type="button"
            aria-label="Close"
            onClick={handleHideDrawer}
          >
            Close
          </button>

          {notifications.length === 0 ? (
            <p>
              No new notification for now
            </p>
          ) : (
            <>
              <p>
                Here is the list of
                notifications
              </p>

              <ul>
                {notifications.map(
                  (notification) => (
                    <li
                      key={notification.id}
                      data-notification-type={
                        notification.type
                      }
                      onClick={() =>
                        markNotificationAsRead(
                          notification.id
                        )
                      }
                    >
                      {notification.value || (
                        <span
                          dangerouslySetInnerHTML={
                            notification.html
                          }
                        />
                      )}
                    </li>
                  )
                )}
              </ul>
            </>
          )}
        </div>
      )}

      <header>
        <h1>School dashboard</h1>

        {user.isLoggedIn && (
          <div id="logoutSection">
            Welcome{' '}
            <strong>{user.email}</strong>{' '}
            <a
              href="#logout"
              onClick={logOut}
            >
              logout
            </a>
          </div>
        )}
      </header>

      <main>
        {user.isLoggedIn ? (
          <section>
            <h2>Course list</h2>

            {courses.length === 0 ? (
              <p>
                No course available yet
              </p>
            ) : (
              <ul>
                {courses.map((course) => (
                  <li key={course.id}>
                    {course.name}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : (
          <section>
            <h2>Log in to continue</h2>
            <Login onLogin={logIn} />
          </section>
        )}
      </main>

      <footer>
        <p>
          Copyright {getCurrentYear()} -{' '}
          {getFooterCopy(true)}
        </p>

        {user.isLoggedIn && (
          <a href="mailto:contact@holbertonschool.com">
            Contact us
          </a>
        )}
      </footer>
    </div>
  );
}
