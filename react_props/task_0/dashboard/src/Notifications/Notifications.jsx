import React from 'react';
import './Notifications.css';
import closeIcon from '../assets/close-button.png';
import { getLatestNotification } from '../utils/utils';

function Notifications() {
  const handleCloseClick = () => {
    console.log('Close button has been clicked');
  };

  return (
    <div className="notification-items">
      <button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
        aria-label="Close"
        onClick={handleCloseClick}
      >
        <img src={closeIcon} alt="close" />
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
      </ul>
    </div>
  );
}

export default Notifications;
