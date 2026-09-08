import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import NewContext, {
  user as contextUser,
} from '../Context/context';
import { getLatestNotification } from '../utils/utils';

export default function App() {
  const [displayDrawer, setDisplayDrawer] =
    useState(true);

  const [user, setUser] = useState(contextUser);

  const [notifications, setNotifications] =
    useState([]);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let isActive = true;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          '/notifications.json'
        );

        const loadedNotifications =
          response.data.notifications.map(
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

        if (isActive) {
          setNotifications(loadedNotifications);
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

        if (isActive) {
          setCourses(response.data.courses);
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
      setCourses([]);
    }

    return () => {
      isActive = false;
    };
  }, [user]);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    });
  }, []);

  const logOut = useCallback(() => {
    setUser({
      ...contextUser,
    });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    setNotifications((previousNotifications) =>
      previousNotifications.filter(
        (notification) => notification.id !== id
      )
    );

    console.log(
      `Notification ${id} has been marked as read`
    );
  }, []);

  return (
    <NewContext.Provider
      value={{
        user,
        logOut,
      }}
    >
      <div className="flex min-h-screen flex-col">
        <div className="root-notifications relative w-full">
          <Notifications
            displayDrawer={displayDrawer}
            notifications={notifications}
            handleDisplayDrawer={
              handleDisplayDrawer
            }
            handleHideDrawer={
              handleHideDrawer
            }
            markNotificationAsRead={
              markNotificationAsRead
            }
          />
        </div>

        <Header />

        <main className="App-content flex-1 px-6 py-8 max-[520px]:px-3">
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom
              title="Course list"
            >
              <CourseList
                courses={courses}
              />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom
              title="Log in to continue"
            >
              <Login
                email={user.email}
                password={user.password}
                logIn={logIn}
              />
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
    </NewContext.Provider>
  );
}

