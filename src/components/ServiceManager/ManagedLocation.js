import React from 'react';
import { useSelector } from 'react-redux';
import LocationDropdown from './LocationDropdown';
import AppointedLocation from './AppointedLocation';
import { APP_PAGE_URLS, USER_TYPE } from '../../utils/constants';
import { useLocation } from 'react-router';
import './style.scss';

function ManagedLocation() {
  const role = useSelector((state) => state.user.currentUser?.role);
  // const urlPath = useLocation().pathname;

  return (
    <div className="location-manager">
      {
        (role && role.toString() !== USER_TYPE.client.toString()) ? 
        role.toString() === USER_TYPE.admin.toString()
          ? (
            <LocationDropdown
              // readOnly={urlPath === `/${APP_PAGE_URLS.editContract}` || urlPath === `/${APP_PAGE_URLS.addContract}`}
            />
          ) : 
          <AppointedLocation />
        : ""
      }
      
    </div>
  );
}

export default ManagedLocation;
