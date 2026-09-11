/* eslint-disable react-refresh/only-export-components */

import {
  memo,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  css,
} from 'aphrodite';

import closeIcon from '../../assets/close-icon.png';
import NotificationItem from '../NotificationItem/NotificationItem';

function Notifications({
  notifications = [],
  markNotificationAsRead = () => {},
}) {
  const DrawerRef = useRef(null);

  const handleToggleDrawer = () => {
    if (!DrawerRef.current) {
      return;
    }

    const visibleStyle = css(
      styles.visible
    );

    if (
      DrawerRef.current.classList.contains(
        'visible'
      )
    ) {
      DrawerRef.current.classList.remove(
        'visible'
      );

      DrawerRef.current.classList.remove(
        visibleStyle
      );
    } else {
      DrawerRef.current.classList.add(
        'visible'
      );

      DrawerRef.current.classList.add(
        visibleStyle
      );
    }
  };

  const handleTitleKeyDown = (event) => {
    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      handleToggleDrawer();
    }
  };

  return (
    <>
      <div
        className="menuItem notification-title ml-auto mr-5 mb-2 w-1/4 cursor-pointer text-right max-[912px]:mr-3 max-[912px]:w-full"
        role="button"
        tabIndex={0}
        onClick={handleToggleDrawer}
        onKeyDown={handleTitleKeyDown}
      >
        Your notifications
      </div>

      <div
        ref={DrawerRef}
        className={`${css(
          styles.drawer
        )} Notifications notification-items relative ml-auto mr-5 w-1/4 border-2 border-dashed border-[var(--main-color)] p-1.5 max-[912px]:fixed max-[912px]:inset-0 max-[912px]:z-50 max-[912px]:m-0 max-[912px]:h-screen max-[912px]:w-screen max-[912px]:overflow-auto max-[912px]:bg-white max-[912px]:p-3`}
      >
        <button
          type="button"
          className="close-button absolute right-2 top-2 cursor-pointer border-0 bg-transparent"
          aria-label="Close"
          onClick={handleToggleDrawer}
        >
          <img
            className="h-4 w-4"
            src={closeIcon}
            alt="close icon"
          />
        </button>

        {notifications.length === 0 ? (
          <p>
            No new notification for now
          </p>
        ) : (
          <>
            <p>
              Here is the list of notifications
            </p>

            <ul className="pl-6 max-[912px]:list-disc max-[912px]:space-y-3">
              {notifications.map(
                (notification) => (
                  <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    type={
                      notification.type
                    }
                    value={
                      notification.value
                    }
                    html={
                      notification.html
                    }
                    markAsRead={
                      markNotificationAsRead
                    }
                  />
                )
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export const styles =
  StyleSheet.create({
    drawer: {
      opacity: 0,
      visibility: 'hidden',
    },

    visible: {
      opacity: 1,
      visibility: 'visible',
    },
  });

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string,
      }),
    })
  ),
  markNotificationAsRead:
    PropTypes.func,
};

function areNotificationsPropsEqual(
  previousProps,
  nextProps
) {
  return (
    previousProps.notifications ===
      nextProps.notifications &&
    previousProps
      .markNotificationAsRead ===
      nextProps.markNotificationAsRead
  );
}

export {
  Notifications,
  areNotificationsPropsEqual,
};

export default memo(
  Notifications,
  areNotificationsPropsEqual
);
