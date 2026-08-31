/* eslint-disable react-refresh/only-export-components */

import {
  useCallback,
  useMemo,
  useState,
} from 'react';

import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import NewContext from '../Context/context';
import { getLatestNotification } from '../utils/utils';

export const notificationsList = [
  {
    id: 1,
    type: 'default',
    value: 'New course available',
  },
  {
    id: 2,
    type: 'urgent',
    value: 'New resume available',
  },
  {
    id: 3,
    type: 'urgent',
    html: {
      __html: getLatestNotification(),
    },
  },
];

export const coursesList = [
  {
    id: 1,
    name: 'ES6',
    credit: 60,
  },
  {
    id: 2,
    name: 'Webpack',
    credit: 20,
  },
  {
    id: 3,
    name: 'React',
    credit: 40,
  },
];

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

function App() {
  const [
    displayDrawer,
    setDisplayDrawer,
  ] = useState(true);

  const [user, setUser] = useState(defaultUser);

  const [
    notifications,
    setNotifications,
  ] = useState(notificationsList);

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
      email: '',
      password: '',
      isLoggedIn: false,
    });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(
      `Notification ${id} has been marked as read`
    );

    setNotifications((currentNotifications) =>
      currentNotifications.filter(
        (notification) => notification.id !== id
      )
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      logOut,
    }),
    [user, logOut]
  );

  return (
    <NewContext.Provider value={contextValue}>
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
                courses={coursesList}
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

export { App };
export default App;
