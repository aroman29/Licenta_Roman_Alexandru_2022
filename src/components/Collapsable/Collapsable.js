import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import AfButton from '../Button/Button';
import { BUTTON_TYPES } from '../../utils/constants';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './style.scss';

const Collapsable = ({
  icon, buttonText, buttonIcon, children, defaultDisplay
}) => {

  // const [showCollapsable, setShowCollapsable] = useState(false);
  const [arrowUp, setArrowUp] = useState(defaultDisplay);

  const showHide = () => {
    setArrowUp(!arrowUp);
  }

  return (
    <div className="collapsable-wrapper">
      <div className="static-box">
        {buttonText && (
          <div className="title-button">
            {arrowUp ? <ExpandMoreIcon onClick={() => showHide()}/> : ""}
            {!arrowUp ? <ExpandLessIcon onClick={() => showHide()}/> : ""}
            <span>{buttonText}</span>
            
          </div>
        )}
      </div>

      <div className={`collapsable-container ${arrowUp ? "collapsed" : "visual"}`}>
        {children}
      </div>
      
    </div>
  );
};

Collapsable.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  buttonIcon: PropTypes.object,
  children: PropTypes.node,
  buttonClick: PropTypes.func,
  rightText: PropTypes.string,
  topBarClass: PropTypes.string,
};

Collapsable.defaultProps = {
  icon: null,
  title: 'title',
  buttonText: '',
  buttonIcon: null,
  children: null,
  buttonClick: () => {},
  rightText: '',
  topBarClass: '',
};

export default Collapsable;
