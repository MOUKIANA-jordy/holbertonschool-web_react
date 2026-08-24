/* eslint-disable react-refresh/only-export-components */

import React, { Component } from 'react';

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

export const listNotificationsInitialState =
  notificationsList;

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

export class App extends Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);

    this.handleKeyDown =
      this.handleKeyDown.bind(this);

    this.handleDisplayDrawer =
      this.handleDisplayDrawer.bind(this);

    this.handleHideDrawer =
      this.handleHideDrawer.bind(this);

    this.markNotificationAsRead =
      this.markNotificationAsRead.bind(this);

    this.state = {
      displayDrawer: false,

      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },

      logOut: this.logOut,

      notifications: notificationsList,
      listNotifications: notificationsList,

      courses: coursesList,
    };
  }

  componentDidMount() {
    document.addEventListener(
      'keydown',
      this.handleKeyDown
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      'keydown',
      this.handleKeyDown
    );
  }

  handleKeyDown(event) {
    if (
      event.ctrlKey &&
      event.key &&
      event.key.toLowerCase() === 'h'
    ) {
      event.preventDefault();

      window.alert('Logging you out');

      this.logOut();
    }
  }

  handleDisplayDrawer() {
    this.setState({
      displayDrawer: true,
    });
  }

  handleHideDrawer() {
    this.setState({
      displayDrawer: false,
    });
  }

  logIn(email, password) {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  }

  logOut() {
    this.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
    });
  }

  markNotificationAsRead(id) {
    console.log(
      `Notification ${id} has been marked as read`
    );

    const updatedNotifications =
      this.state.notifications.filter(
        (notification) =>
          notification.id !== id
      );

    this.setState({
      notifications: updatedNotifications,
      listNotifications: updatedNotifications,
    });
  }

  render() {
    const {
      displayDrawer,
      user,
      logOut,
      notifications,
      listNotifications,
      courses,
    } = this.state;

    const contextValue = {
      user,
      logOut,
    };

    return (
      <NewContext.Provider value={contextValue}>
        <div className="flex min-h-screen flex-col">
          <div className="root-notifications relative w-full">
            <Notifications
              displayDrawer={displayDrawer}
              notifications={notifications}
              listNotifications={
                listNotifications
              }
              handleDisplayDrawer={
                this.handleDisplayDrawer
              }
              handleHideDrawer={
                this.handleHideDrawer
              }
              markNotificationAsRead={
                this.markNotificationAsRead
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
                  logIn={this.logIn}
                />
              </BodySectionWithMarginBottom>
            )}

            <BodySection
              title="News from the School"
            >
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
}

export default App;
