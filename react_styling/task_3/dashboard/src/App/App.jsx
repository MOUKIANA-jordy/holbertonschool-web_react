import React, {
  Component,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';

import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { getLatestNotification } from '../utils/utils';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleKeyDown =
      this.handleKeyDown.bind(this);
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
      'ctrlKey' in event &&
      'key' in event &&
      event.ctrlKey &&
      event.key.toLowerCase() === 'h'
    ) {
      event.preventDefault();

      window.alert('Logging you out');

      const { logOut } = this.props;
      logOut();
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    const notificationsList = [
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

    const coursesList = [
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

    return (
      <Fragment>
        <div className="root-notifications relative w-full">
          <Notifications
            displayDrawer
            notifications={notificationsList}
          />
        </div>

        <Header />

        <main className="App-content min-h-[55vh] py-[30px] max-md:p-[15px]">
          {isLoggedIn ? (
            <BodySectionWithMarginBottom
              title="Course list"
            >
              <CourseList courses={coursesList} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom
              title="Log in to continue"
            >
              <Login />
            </BodySectionWithMarginBottom>
          )}

          <BodySection title="News from the School">
            <p>
              Holberton School News goes here
            </p>
          </BodySection>
        </main>

        <Footer />
      </Fragment>
    );
  }
}

App.defaultProps = {
  isLoggedIn: true,
  logOut: () => {},
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
};

export default App;
