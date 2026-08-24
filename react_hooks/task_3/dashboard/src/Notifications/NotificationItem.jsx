import { memo } from 'react';
import PropTypes from 'prop-types';

function NotificationItem({
  id,
  type,
  value,
  html,
  markAsRead,
}) {
  const handleClick = () => {
    markAsRead(id);
  };

  const typeClass =
    type === 'urgent'
      ? 'text-red-600'
      : 'text-blue-600';

  if (html) {
    return (
      <li
        className={`${typeClass} cursor-pointer max-[912px]:border-b max-[912px]:border-gray-300 max-[912px]:p-3 max-[520px]:text-sm`}
        data-notification-type={type}
        onClick={handleClick}
        dangerouslySetInnerHTML={html}
      />
    );
  }

  return (
    <li
      className={`${typeClass} cursor-pointer max-[912px]:border-b max-[912px]:border-gray-300 max-[912px]:p-3 max-[520px]:text-sm`}
      data-notification-type={type}
      onClick={handleClick}
    >
      {value}
    </li>
  );
}

NotificationItem.defaultProps = {
  id: 0,
  type: 'default',
  value: '',
  html: undefined,
  markAsRead: () => {},
};

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
};

export { NotificationItem };
export default memo(NotificationItem);
