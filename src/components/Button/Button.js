import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BUTTON_TYPES } from '../../utils/constants';
import './style.scss';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const AfButton = ({
  text, onClick, buttonIcon, buttonType, small, disabled, loading, green, ...rest
}) => {
  if (!loading) {
    return (
      <button type="button" {...rest} disabled={disabled} className={`${small ? 'small' : ''} ${disabled ? 'disabled' : ''} button ${buttonType}`} onClick={onClick}>
        {buttonIcon != null ? <FontAwesomeIcon icon={buttonIcon} className="button-icon" spin={buttonIcon === faCircleNotch} /> : null}
        {text || null}
      </button>
    );
  }
  return (
    <button type="button" {...rest} disabled className={`${small ? 'small' : ''} disabled button ${buttonType}`} onClick={onClick}>
      <FontAwesomeIcon icon={faCircleNotch} className="button-icon" spin />
    </button>
  );
};

AfButton.propTypes = {
  text: PropTypes.string,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  buttonIcon: PropTypes.object,
  buttonType: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
  loading: PropTypes.bool,
};

AfButton.defaultProps = {
  text: '',
  small: false,
  disabled: false,
  onClick: () => {},
  buttonIcon: null,
  buttonType: BUTTON_TYPES.primary,
  loading: false,
};

export default AfButton;
