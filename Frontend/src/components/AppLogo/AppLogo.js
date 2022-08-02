import React from 'react';
import { useTranslation } from 'react-i18next';
import carLogo from '../../sport-car (2).png';
import { useHistory } from 'react-router-dom';
import './style.scss';

const AppLogo = () => {

  const { t: translate } = useTranslation();
  const history = useHistory();

  return (
    <div class="logo" onClick={() => {history.push('/');}}>
      <img src = {carLogo} className="app-car-logo" />
      <div className="p">
        {translate('GENERAL.logo')}
        <span>{translate('GENERAL.logo-colored')}</span>
      </div>
      
    </div>

  );
}

export default AppLogo;