import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Notifications from './components/Notifications/Notifications';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Footer from './components/Footer/Footer';
import CourseList from './pages/CourseList/CourseList';
import BodySection from './components/BodySection/BodySection';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';

import {
  fetchNotifications,
} from './features/notifications/notificationsSlice';

import {
  fetchCourses,
} from './features/courses/coursesSlice';

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCourses());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className="flex min-h-screen flex-col">
      <Notifications />

      <Header />

      <main className="App-content flex-1 px-6 py-8 max-[520px]:px-3">
        {isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
            <CourseList />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title="">
            <Login />
          </BodySectionWithMarginBottom>
        )}

        <BodySection title="News from the School">
          <p>Holberton School News goes here</p>
        </BodySection>
      </main>

      <Footer />
    </div>
  );
}

export default App;
