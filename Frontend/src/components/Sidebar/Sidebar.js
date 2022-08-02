import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import {
  faHome, faUserAlt, faArrowAltCircleLeft, faKey, faLongArrowAltLeft, faCar, 
} from '@fortawesome/free-solid-svg-icons';
import {
  faBuilding, faUser, faComments, faMessage
} from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';
import logoutAction from '../../redux/actions/logoutAction';
import { APP_PAGE_URLS, USER_TYPE } from '../../utils/constants';
import { composeName } from '../../utils/utils';
import './style.scss';

const SidebarLink = ({
  url, icon, label, notification, onClick
}) => (
  <div className="link-wrapper" onClick={() => onClick()}>
    <NavLink exact to={url} activeClassName="active-link">
      {notification ? <div className="notifications">{notification}</div> : ''}
      <FontAwesomeIcon icon={icon} className="icon" />
      {label}
    </NavLink>
  </div>
);
{/* ${admin? 'admin/' : ''} */}
const Sidebar = ({title}) => {

  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const currentUser = useSelector((state) => state.user.currentUser);
  const partnerId = useSelector((state) => state.message.partnerId);

  const onLogoutClick = useCallback(() => {
    dispatch(logoutAction.logout());
  }, [dispatch]);

  return (
    <div class="sidebar">
      <div className="user-name">
        <p>
          <FontAwesomeIcon icon={faUserAlt} className="icon" />
          {currentUser ? composeName(currentUser.lastName, currentUser.firstName) : title}
        </p>
      </div>
      <nav>
        {(currentUser !== null && currentUser.role !== USER_TYPE.client.toString())
        ? <ul class="rent-list">
            <SidebarLink url={'/admin/dashboard'} label={translate('SIDEBAR.dashboardLink')} icon={faHome} />
            {currentUser.role === USER_TYPE.admin.toString() 
            ? <SidebarLink url={'/admin/services'} label={translate('SIDEBAR.servicesLink')} icon={faBuilding} />
            : ""
            }
            <SidebarLink url={'/admin/cars'} label={translate('SIDEBAR.carsLink')} icon={faCar} />
            {partnerId !== null 
            ? <SidebarLink url={'/admin/chat'} label="Chat" icon={faMessage} />
            : ""
            }
            <SidebarLink url={'/login'} label={translate('SIDEBAR.logoutLink')} icon={faLongArrowAltLeft} onClick={onLogoutClick} />
          </ul>

        : <ul class="rent-list">
            <SidebarLink url={'/'} label={translate('SIDEBAR.clientHomeLink')} icon={faHome} />
            <SidebarLink url={'/selectService'} label={translate('SIDEBAR.selectServiceLink')} icon={faBuilding} />
            {currentUser !== null ? <SidebarLink url={'/yourCars'} label="Your Cars" icon={faCar} /> : ""}
            {currentUser !== null ? <SidebarLink url={'/chat'} label="Chat" icon={faMessage} /> : ""}
            {currentUser !== null 
            ? <SidebarLink url={'/login'} label={translate('SIDEBAR.logoutLink')} icon={faLongArrowAltLeft} onClick={onLogoutClick} /> 
            : <SidebarLink url={'/login'} label={translate('SIDEBAR.authenticateLink')} icon={faLongArrowAltLeft} onClick={onLogoutClick} />
            }
            
          </ul>
      }
        
      </nav>
    </div>  
  );
}

export default Sidebar;