import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.handleCloseClick =
      this.handleCloseClick.bind(this);

    this.markAsRead = this.markAsRead.bind(this);
  }

  handleCloseClick() {
    console.log('Close button has been clicked');
  }

  markAsRead(id) {
    console.log(
      `Notification ${id} has been marked as read`
    );
  }

  render() {
    const {
      notifications,
      displayDrawer,
    } = this.props;

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
              onClick={this.handleCloseClick}
            >
              <img src={closeIcon} alt="close" />
            </button>

            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>
                  Here is the list of notifications
                </p>

                <ul>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={this.markAsRead}
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
}

Notifications.defaultProps = {
  notifications: [],
  displayDrawer: false,
};

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
