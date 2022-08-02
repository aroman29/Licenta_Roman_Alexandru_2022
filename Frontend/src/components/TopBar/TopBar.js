import React from 'react';
import AppLogo from '../AppLogo/AppLogo';
import ManagedLocation from '../ServiceManager/ManagedLocation';
import './style.scss';

const TopBar = () => {

  return (

    <div class="header">
      <AppLogo />
      <nav>
        {/* selection */}
        <ManagedLocation />
      </nav>
    </div>
  );
}

export default TopBar;