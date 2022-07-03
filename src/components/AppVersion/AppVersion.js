import React from 'react';
import { useTranslation } from 'react-i18next';
import './style.scss';

const AfAppVersion = () => {
  const { t: translate } = useTranslation();
  const version = process.env.REACT_APP_VERSION;

  return (
    <div className="app-version">
      <p>{translate('GENERAL.copyright')}</p>
      <p>{translate('GENERAL.versionLabel', { version })}</p>
    </div>
  );
};

export default AfAppVersion;
