import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

const AfMessage = ({
  message, user, hasIcon, showTime, sendTime, dataContent,
}) => {
  const key = useRef(0);
  // console.log(dataContent);

  return (
    <>
      {showTime && (
        <div className="time-bar">
          {sendTime}
        </div>
      )}

      <div className={`message-wrapper ${!user ? 'align-left' : 'align-right'}`}>
        <div className="icon-container">
          {(!user && hasIcon) && <FontAwesomeIcon className="icon left" icon={faUserAlt} />}
        </div>
        <div title={dataContent} className="message-container">
          <div key={key} className={!user ? 'text-left' : 'text-right'}>
            {message}
          </div>
        </div>
        <div className="icon-container">
          {(user && hasIcon) && <FontAwesomeIcon className="icon right" icon={faUserAlt} />}
        </div>
      </div>
    </>
  );
};

AfMessage.propTypes = {
  message: PropTypes.string.isRequired,
  user: PropTypes.bool.isRequired,
  hasIcon: PropTypes.bool.isRequired,
  showTime: PropTypes.bool.isRequired,
  sendTime: PropTypes.string.isRequired,
  dataContent: PropTypes.string.isRequired,
};

export default AfMessage;
