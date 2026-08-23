import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends PureComponent {
  render() {
    const {
      id,
      type,
      html,
      value,
      markAsRead,
    } = this.props;

    const textColorClass =
      type === 'urgent'
        ? 'text-[var(--urgent-notification-item)]'
        : 'text-[var(--default-notification-item)]';

    if (html) {
      return (
        <li
          className={textColorClass}
          data-notification-type={type}
          onClick={() => markAsRead(id)}
          dangerouslySetInnerHTML={html}
        />
      );
    }

    return (
      <li
        className={textColorClass}
        data-notification-type={type}
        onClick={() => markAsRead(id)}
      >
        {value}
      </li>
    );
  }
}

NotificationItem.defaultProps = {
  id: 0,
  type: 'default',
  html: null,
  value: '',
  markAsRead: () => {},
};

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  value: PropTypes.string,
  markAsRead: PropTypes.func,
};

export default NotificationItem;
