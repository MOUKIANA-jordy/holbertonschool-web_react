import { useDispatch, useSelector } from 'react-redux';

import closeIcon from '../../assets/close-icon.png';
import NotificationItem from '../NotificationItem/NotificationItem';

import {
  hideDrawer,
  markNotificationAsRead,
  showDrawer,
} from '../../features/notifications/notificationsSlice';

function Notifications() {
  const dispatch = useDispatch();

  const {
    notifications,
    displayDrawer,
  } = useSelector(
    (state) => state.notifications
  );

  const handleDisplayDrawer = () => {
    dispatch(showDrawer());
  };

  const handleHideDrawer = () => {
    dispatch(hideDrawer());
  };

  const handleMarkNotificationAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  const notificationTitleClassName = `
    menuItem
    notification-title
    ml-auto
    mr-5
    mb-2
    w-1/4
    cursor-pointer
    text-right
    max-[912px]:mr-3
    max-[912px]:w-full
    ${
      notifications.length > 0 && !displayDrawer
        ? 'animate-bounce'
        : ''
    }
  `.trim();

  return (
    <div className="root-notifications relative w-full">
      <div
        className={notificationTitleClassName}
        onClick={handleDisplayDrawer}
        onKeyDown={(event) => {
          if (
            event.key === 'Enter' ||
            event.key === ' '
          ) {
            handleDisplayDrawer();
          }
        }}
        role="button"
        tabIndex="0"
      >
        Your notifications
      </div>

      {displayDrawer && (
        <div className="Notifications notification-items relative ml-auto mr-5 w-1/4 border-2 border-dashed border-[var(--main-color)] p-1.5 max-[912px]:fixed max-[912px]:inset-0 max-[912px]:z-50 max-[912px]:m-0 max-[912px]:h-screen max-[912px]:w-screen max-[912px]:overflow-auto max-[912px]:bg-white max-[912px]:p-3">
          <button
            type="button"
            aria-label="Close"
            className="close-button absolute right-2 top-2 cursor-pointer border-0 bg-transparent"
            onClick={handleHideDrawer}
          >
            <img
              src={closeIcon}
              alt="close icon"
              className="h-4 w-4"
            />
          </button>

          {notifications.length === 0 ? (
            <p>No new notification for now</p>
          ) : (
            <>
              <p>Here is the list of notifications</p>

              <ul className="pl-6 max-[912px]:list-disc max-[912px]:space-y-3">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    id={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={
                      handleMarkNotificationAsRead
                    }
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Notifications;
