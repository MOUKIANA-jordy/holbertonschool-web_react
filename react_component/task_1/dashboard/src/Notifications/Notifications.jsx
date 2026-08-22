import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

function Notifications({
  notifications = [],
  displayDrawer = false,
}) {
  const handleCloseClick = () => {
    console.log('Close button has been clicked');
  };

  return (
    <Fragment>
      <div className="notification-title">
        Your notifications
      </div>

      {displayDrawer && (
        <div className="notification-items">
          <button
            type="button"
            className="close-button"
            aria-label="Close"
            onClick={handleCloseClick}
          >
            <img src={closeIcon} alt="close" />
          </button>

          {notifications.length === 0 ? (
            <p>No new notification for now</p>
          ) : (
            <>
              <p>Here is the list of notifications</p>

              <ul>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </Fragment>
  );
}

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
  displayDrawer: PropTypes.bool,
};

export default Notifications;
