import React, {
  Component,
  Fragment,
} from 'react';
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
    const {
      notifications,
      displayDrawer,
    } = this.props;

    return (
      nextProps.notifications.length !==
        notifications.length ||
      nextProps.displayDrawer !== displayDrawer
    );
  }

  handleCloseClick() {
    const { handleHideDrawer } = this.props;

    console.log('Close button has been clicked');
    handleHideDrawer();
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
      handleDisplayDrawer,
    } = this.props;

    const titleAnimationClass =
      notifications.length > 0 && !displayDrawer
        ? 'animate-bounce'
        : '';

    return (
      <Fragment>
        <div
          className={`notification-title mb-2 cursor-pointer pr-5 text-right ${titleAnimationClass}`}
          onClick={handleDisplayDrawer}
          role="button"
          tabIndex={0}
        >
          Your notifications
        </div>

        {displayDrawer && (
          <div className="notification-items relative ml-auto w-1/4 border-2 border-dashed border-[var(--main-color)] p-1.5 max-[912px]:fixed max-[912px]:inset-0 max-[912px]:z-50 max-[912px]:h-screen max-[912px]:w-screen max-[912px]:overflow-y-auto max-[912px]:border-0 max-[912px]:bg-white max-[912px]:p-3">
            <button
              type="button"
              className="close-button absolute right-2 top-2 cursor-pointer border-0 bg-transparent max-[912px]:right-3 max-[912px]:top-3"
              aria-label="Close"
              onClick={this.handleCloseClick}
            >
              <img
                className="h-4 w-4 max-[912px]:h-5 max-[912px]:w-5"
                src={closeIcon}
                alt="close"
              />
            </button>

            {notifications.length === 0 ? (
              <p className="max-[912px]:pr-8 max-[912px]:text-lg">
                No new notification for now
              </p>
            ) : (
              <>
                <p className="max-[912px]:pr-8 max-[912px]:text-lg">
                  Here is the list of notifications
                </p>

                <ul className="mt-3 list-disc pl-6 max-[912px]:mt-4 max-[912px]:list-none max-[912px]:p-0">
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
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
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
};

export default Notifications;
