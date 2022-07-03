import React, { useState, useEffect } from 'react';
import AfPage from '../../components/Page/Page';
import { faBuilding, faPaperPlane, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import ServiceActions from '../../redux/actions/ServiceActions';
import {APP_PAGE_URLS } from '../../utils/constants'
import AfButton from '../../components/Button/Button';
import AfModal from '../../components/Modal/Modal';
import {BUTTON_TYPES} from '../../utils/constants';
import appointImage from '../../appointment-2.jpg';
import './style.scss';

const ServicesPage = () => {

  const { t: translate } = useTranslation();
  const history = useHistory();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services);

  useEffect(() => {
    dispatch(ServiceActions.getServices());
  }, []);

  return(
    <AfPage
      title='Select a service'
      icon1
    >
      <div>
        <div className="info-container">
          <img src={appointImage} className="page-wallpaper" alt="Autofocus.jpeg" />
          <div className="info-header">
            <div className="info-header-title">{translate('SERVICES_PAGE.info.title')}</div>
            <div className="info-header-text">{translate('SERVICES_PAGE.info.text')}
            </div>
          </div>
        </div>
        {services !== [] ? <table>
            <tbody>
            
              <tr className="table-header">
                <th>
                  {translate('SERVICES.tableHeaders.index')}
                </th>
                <th>
                  {translate('SERVICES.tableHeaders.address')}
                </th>
                <th>
                  {translate('SERVICES.tableHeaders.city')}
                </th>
                <th>
                  {translate('SERVICES.tableHeaders.open')}
                </th>
                <th>
                  {translate('SERVICES.tableHeaders.actions')}
                </th>
              </tr>
              {services.map((locationItem, index) => {
                //  console.log(locationItem);
                  return (
                    <tr key={locationItem?.id}>
                      <td>
                        {index + 1}
                      </td>
                      <td>
                        {locationItem.address}
                      </td>
                      <td>
                        {locationItem.city}
                      </td>
                      <td>{new Date().getHours() <= 18 ? "YES" : "NO"}</td>
                      <td>
                        <div className="action-buttons">
                          <AfButton
                            text={translate('BUTTONS.viewService')}
                            buttonIcon={faPaperPlane}
                            onClick={() => {
                              history.push({
                                pathname: `${path.replace('/selectService', '')}/${APP_PAGE_URLS.service}/${locationItem?.id}`,
                              });
                            }}
                            buttonType={BUTTON_TYPES.primary}
                            small
                          />
                          {/* {locationItem.status === LOCATION_RENTAL_STATUSES.notRented
                              && (<RbButton text={translate('LOCATIONS.button.delete')} buttonIcon={faTimes} onClick={() => handleOpenModal(locationItem?.id)} buttonType={BUTTON_TYPES.remove} small />)} */}
                        </div>
                      </td>
                    </tr>
                  );
              })}
              {/* {filteredLocationsCount === 0 ? <div className="filter-not-found">{translate('LOCATIONS.emptyLocations')}</div> : ''} */}
            </tbody>
          </table>
          :
          "Services are unavaliable for the moment"
          }
         </div>
    </AfPage>
  )
}

export default ServicesPage;
