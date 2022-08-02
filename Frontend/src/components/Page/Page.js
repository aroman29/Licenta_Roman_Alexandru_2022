import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import AfButton from '../Button/Button';
import { BUTTON_TYPES } from '../../utils/constants';
import './style.scss';

const AfPage = ({
  icon, title, buttonText, buttonClick, buttonIcon, rightText, topBarClass, children, icon1
}) => {


  return (
    <div className="page">
      <div className={`page-header ${topBarClass}`}>
        <div className="title-side">
          <FontAwesomeIcon icon={icon} className="title-icon" />
          {icon1 ? <CarRepairIcon className="title-icon" sx={{ fontSize: 30 }} /> : ""}
          <div className="title-text">
            {title}
          </div>
        </div>
        {buttonText && (
          <div className="title-button">
            <AfButton
              text={buttonText}
              buttonIcon={buttonIcon}
              onClick={buttonClick}
              buttonType={BUTTON_TYPES.primary}
            />
          </div>
        )}
        {rightText && (
          <div className="name-header">
            {rightText}
          </div>
        )}
      </div>
      <div className="page-content">
        {children}
      </div>

    </div>
  );
};

AfPage.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  buttonIcon: PropTypes.object,
  children: PropTypes.node,
  buttonClick: PropTypes.func,
  rightText: PropTypes.string,
  topBarClass: PropTypes.string,
};

AfPage.defaultProps = {
  buttonText: '',
  buttonIcon: null,
  children: null,
  buttonClick: () => {},
  rightText: '',
  topBarClass: '',
};

export default AfPage;
