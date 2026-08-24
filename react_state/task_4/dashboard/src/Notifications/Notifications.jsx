import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends PureComponent {
  constructor(props) {
    super(props);

    this.handleTitleClick =
      this.handleTitleClick.bind(this);
    this.handleCloseClick =
      this.handleCloseClick.bind(this);
  }

  handleTitleClick() {
    const { handleDisplayDrawer } = this.props;
    handleDisplayDrawer();
  }

  handleCloseClick() {
    const { handleHideDrawer } = this.props;
    handleHideDrawer();
  }

  render() {
    const {
      notifications,
      displayDrawer,
      markNotificationAsRead,
    } = this.props;

    const titleClasses = [
      'notification-title',
      'ml-auto',
      'mr-5',
      'mb-2',
      'w-1/4',
      'cursor-pointer',
      'text-right',
      'max-[912px]:mr-3',
      'max-[912px]:w-full',
    ];

    if (
      notifications.length > 0 &&
      !displayDrawer
    ) {
      titleClasses.push('animate-bounce');
    }

    return (
      <>
        <div
          className={titleClasses.join(' ')}
          role="button"
          tabIndex={0}
          onClick={this.handleTitleClick}
          onKeyDown={(event) => {
            if (
              event.key === 'Enter' ||
              event.key === ' '
            ) {
              this.handleTitleClick();
            }
          }}
        >
          Your notifications
        </div>

        {displayDrawer && (
          <div className="notification-items relative ml-auto mr-5 w-1/4 border-2 border-dashed border-[var(--main-color)] p-1.5 max-[912px]:fixed max-[912px]:inset-0 max-[912px]:z-50 max-[912px]:m-0 max-[912px]:h-screen max-[912px]:w-screen max-[912px]:overflow-auto max-[912px]:bg-white max-[912px]:p-3">
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
              <p>No new notification for now</p>
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
                        type={notification.type}
                        value={notification.value}
                        html={notification.html}
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
        )}
      </>
    );
  }
}

Notifications.defaultProps = {
  notifications: [],
  displayDrawer: false,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
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
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

export default Notifications;
