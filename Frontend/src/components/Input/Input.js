import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

const AfInput = React.forwardRef(({
  label, disabled, labelIcon, required, errorMessage,
  type, inputIcon, inputIconClick, small, ...rest
}, ref) => (
  <div className={`input-component ${!label ? 'no-filler' : ''}`}>
    <div className="input-header">
      <div>
        {labelIcon && <FontAwesomeIcon icon={labelIcon} className="icon" />}
        {(required && label) ? `${label}*` : label}
      </div>
      <div className="input-error-msg">{errorMessage}</div>
    </div>
    <div className="input-wrapper">
      <input
        type={type || 'text'}
        ref={ref}
        {...rest}
        className={`text-input ${!label ? 'no-filler' : ''} ${small ? 'small' : ''} ${(disabled) ? 'readonly-element' : ''}`}
        disabled={disabled}
      />
      {inputIcon && (
        <FontAwesomeIcon icon={inputIcon} onClick={inputIconClick} className="input-icon" />
      )}
    </div>
  </div>
));

AfInput.propTypes = {
  labelIcon: PropTypes.object,
  label: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  inputIcon: PropTypes.object,
  inputIconClick: PropTypes.func,
  type: PropTypes.oneOf(['text', 'number', 'date', 'password']),
  small: PropTypes.bool,
};

AfInput.defaultProps = {
  label: '',
  labelIcon: null,
  required: false,
  errorMessage: '',
  disabled: false,
  inputIcon: null,
  inputIconClick: () => {},
  type: 'text',
  small: false,
};

export default AfInput;
