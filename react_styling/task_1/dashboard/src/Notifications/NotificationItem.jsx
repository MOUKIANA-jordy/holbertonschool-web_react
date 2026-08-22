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

    const color = type === 'urgent' ? 'red' : 'blue';

    if (html) {
      return (
        <li
          data-notification-type={type}
          style={{ color }}
          onClick={() => markAsRead(id)}
          dangerouslySetInnerHTML={html}
        />
      );
    }

    return (
      <li
        data-notification-type={type}
        style={{ color }}
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
