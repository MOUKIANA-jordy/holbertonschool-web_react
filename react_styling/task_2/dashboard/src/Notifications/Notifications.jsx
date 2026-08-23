import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.handleCloseClick =
      this.handleCloseClick.bind(this);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { notifications } = this.props;

    return (
      nextProps.notifications.length !==
        notifications.length ||
      nextProps.displayDrawer !==
        this.props.displayDrawer
    );
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
        <div className="notification-title ml-auto mr-5 mb-2 w-1/4 text-right">
          Your notifications
        </div>

        {displayDrawer && (
          <div className="notification-items relative ml-auto mr-5 w-1/4 border-2 border-dashed border-[var(--main-color)] p-1.5">
            <button
              type="button"
              className="close-button absolute right-2 top-2 cursor-pointer border-0 bg-transparent"
              aria-label="Close"
              onClick={this.handleCloseClick}
            >
              <img
                className="h-4 w-4"
                src={closeIcon}
                alt="close"
              />
            </button>

            {notifications.length === 0 ? (
              <p>
                no new notification for now
              </p>
            ) : (
              <>
                <p>
                  Here is the list of notifications
                </p>

                <ul className="pl-6">
                  {notifications.map(
                    (notification) => (
                      <NotificationItem
                        key={notification.id}
                        id={notification.id}
                        type={notification.type}
                        value={notification.value}
                        html={notification.html}
                        markAsRead={
                          this.markAsRead
                        }
                      />
                    )
                  )}
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
