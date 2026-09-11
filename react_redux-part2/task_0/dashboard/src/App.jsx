import {
  useCallback,
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import Notifications from './components/Notifications/Notifications';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';
import CourseList from './pages/CourseList/CourseList';
import BodySection from './components/BodySection/BodySection';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';

import {
  fetchNotifications,
  markNotificationAsRead,
} from './features/notifications/notificationsSlice';

import {
  fetchCourses,
} from './features/courses/coursesSlice';

import {
  login,
} from './features/auth/authSlice';

export default function App() {
  const dispatch = useDispatch();

  const {
    user,
    isLoggedIn,
  } = useSelector(
    (state) => state.auth
  );

  const notifications = useSelector(
    (state) =>
      state.notifications.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCourses());
    }
  }, [dispatch, isLoggedIn]);

  const logIn = useCallback(
    (email, password) => {
      dispatch(
        login({
          email,
          password,
        })
      );
    },
    [dispatch]
  );

  const handleMarkNotificationAsRead =
    useCallback(
      (id) => {
        dispatch(
          markNotificationAsRead(id)
        );
      },
      [dispatch]
    );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="root-notifications relative w-full">
        <Notifications
          notifications={notifications}
          markNotificationAsRead={
            handleMarkNotificationAsRead
          }
        />
      </div>

      <Header />

      <main className="App-content flex-1 px-6 py-8 max-[520px]:px-3">
        {isLoggedIn ? (
          <BodySectionWithMarginBottom
            title="Course list"
          >
            <CourseList />
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

      <Footer />
    </div>
  );
}
