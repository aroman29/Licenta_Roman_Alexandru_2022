import React, { useState, useEffect } from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AfDropDown = React.forwardRef(({
  label, disabled, labelIcon, placeholder,
  required, errorMessage, values, defaultValue, small, long, changeFunction, secondary,
  ...rest
}, ref) => {
  const [defaultOptionValue, setDefaultOptionValue] = useState(defaultValue);

  // make sure the default option is updated if the defaultValue changes
  useEffect(() => {
    setDefaultOptionValue(defaultValue);
  }, [defaultValue]);

  // after selecting an option in select, update the current value
  const updateSelect = (e) => {
    setDefaultOptionValue(e.target.value);
    changeFunction(e.target.value);
  };

  return (
    <div className="dropdown-component">
      <div className={`dropdown-header ${small ? 'small-header' : ''} `}>
        <div>
          {labelIcon && <FontAwesomeIcon icon={labelIcon} className="icon" />}
          {(required) ? `${label}*` : label}
        </div>
        <div className="error-msg">{errorMessage}</div>
      </div>
      <select ref={ref} {...rest} className={`dropdown-text ${(disabled) ? 'readonly-element' : ''} ${small ? 'small' : ''}
       ${(small) ? 'small' : ''} ${(long) ? 'long' : ''} ${(secondary) ? 'secondary' : ''}`} value={defaultOptionValue} onChange={updateSelect}>
        <option value="" disabled>{placeholder}</option>
        {values.map((item) => <option key={item.label} value={item.value}>{item.label}</option>)}
      </select>
    </div>
  );
});

AfDropDown.propTypes = {
  labelIcon: PropTypes.object,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultValue: PropTypes.string,
  small: PropTypes.bool,
  changeFunction: PropTypes.func,
  secondary: PropTypes.bool,
  long: PropTypes.bool,
};

AfDropDown.defaultProps = {
  labelIcon: undefined,
  required: false,
  errorMessage: '',
  placeholder: '',
  disabled: false,
  defaultValue: '',
  small: false,
  changeFunction: () => {},
  secondary: false,
  long: false,
};

export default AfDropDown;
