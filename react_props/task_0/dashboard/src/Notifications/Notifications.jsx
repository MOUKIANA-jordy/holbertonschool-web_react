import React from 'react';
import './Notifications.css';
import closeIcon from '../assets/close-icon.png';

function Notifications() {
  const handleClick = () => console.log('Close button has been clicked');

  return (
    <div className="Notifications">
      <button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Close"
        onClick={handleClick}
      >
        <img src={closeIcon} alt="close icon" width="15px" />
      </button>

      <p>Here is the list of notifications</p>
      <ul>
        <li>New course available</li>
        <li>New resume available</li>
        <li>New data available</li>
      </ul>
    </div>
  );
}

export default Notifications;
