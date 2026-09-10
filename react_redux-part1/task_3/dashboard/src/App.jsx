import {
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import axios from 'axios';

import Notifications from './components/Notifications/Notifications';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';
import CourseList from './pages/CourseList/CourseList';
import BodySection from './components/BodySection/BodySection';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import { getLatestNotification } from './utils/utils';
import {
  APP_ACTIONS,
  appReducer,
  initialState,
} from './appReducer';

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
    let isActive = true;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          '/notifications.json'
        );

        const notificationsData = Array.isArray(
          response.data
        )
          ? response.data
          : response.data.notifications;

        const loadedNotifications =
          notificationsData.map((notification) =>
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

        if (isActive) {
          dispatch({
            type: APP_ACTIONS.SET_NOTIFICATIONS,
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
      isActive = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          '/courses.json'
        );

        const coursesData = Array.isArray(
          response.data
        )
          ? response.data
          : response.data.courses;

        if (isActive) {
          dispatch({
            type: APP_ACTIONS.SET_COURSES,
            payload: coursesData,
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
    } else {
      dispatch({
        type: APP_ACTIONS.SET_COURSES,
        payload: [],
      });
    }

    return () => {
      isActive = false;
    };
  }, [user.isLoggedIn]);

  const handleDisplayDrawer =
    useCallback(() => {
      dispatch({
        type: APP_ACTIONS.TOGGLE_DRAWER,
      payload: true,
      });
    }, []);

  const handleHideDrawer = useCallback(() => {
    dispatch({
      type: APP_ACTIONS.TOGGLE_DRAWER,
      payload: false,
    });
  }, []);

  const logIn = useCallback(
    (email, password) => {
      dispatch({
        type: APP_ACTIONS.LOGIN,
        payload: {
          email,
          password,
        },
      });
    },
    []
  );

  const logOut = useCallback(() => {
    dispatch({
      type: APP_ACTIONS.LOGOUT,
    });
  }, []);

  const markNotificationAsRead = useCallback(
    (id) => {
      dispatch({
        type: APP_ACTIONS.MARK_NOTIFICATION_READ,
        payload: id,
      });

      console.log(
        `Notification ${id} has been marked as read`
      );
    },
    []
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="root-notifications relative w-full">
        <Notifications
          displayDrawer={displayDrawer}
          notifications={notifications}
          handleDisplayDrawer={
            handleDisplayDrawer
          }
          handleHideDrawer={handleHideDrawer}
          markNotificationAsRead={
            markNotificationAsRead
          }
        />
      </div>

      <Header user={user} logOut={logOut} />

      <main className="App-content flex-1 px-6 py-8 max-[520px]:px-3">
        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom
            title="Course list"
          >
            <CourseList courses={courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom
            title="Log in to continue"
          >
            <Login logIn={logIn} />
          </BodySectionWithMarginBottom>
        )}

        <BodySection title="News from the School">
          <p>
            Holberton School News goes here
          </p>
        </BodySection>
      </main>

      <Footer user={user} />
    </div>
  );
}
