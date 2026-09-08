import { useCallback, useEffect, useReducer } from 'react';
import axios from 'axios';

import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { getLatestNotification } from '../utils/utils';
import { APP_ACTIONS, appReducer, initialState } from './appReducer';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { displayDrawer, user, notifications, courses } = state;

  useEffect(() => {
    let isActive = true;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notifications.json');
        const loadedNotifications = response.data.notifications.map(
          (notification) =>
            notification.id === 3
              ? {
                  ...notification,
                  html: { __html: getLatestNotification() },
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
        console.error('Error fetching notifications:', error);
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
        const response = await axios.get('/courses.json');

        if (isActive) {
          dispatch({
            type: APP_ACTIONS.SET_COURSES,
            payload: response.data.courses,
          });
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
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

  const handleDisplayDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, []);

  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, []);

  const logIn = useCallback((email, password) => {
    dispatch({
      type: APP_ACTIONS.LOGIN,
      payload: { email, password },
    });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    dispatch({
      type: APP_ACTIONS.MARK_NOTIFICATION_READ,
      payload: id,
    });
    console.log(`Notification ${id} has been marked as read`);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="root-notifications relative w-full">
        <Notifications
          displayDrawer={displayDrawer}
          notifications={notifications}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          markNotificationAsRead={markNotificationAsRead}
        />
      </div>

      <Header user={user} logOut={logOut} />

      <main className="App-content flex-1 px-6 py-8 max-[520px]:px-3">
        {user.isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList courses={courses} />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={logIn} />
          </BodySectionWithMarginBottom>
        )}

        <BodySection title="News from the School">
          <p>Holberton School News goes here</p>
        </BodySection>
      </main>

      <Footer user={user} />
    </div>
  );
}

