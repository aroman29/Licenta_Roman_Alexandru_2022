import React, { useState } from 'react';
import AfPage from '../../components/Page/Page';
import { faBuilding, faEdit, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faTimes, faAdd } from '@fortawesome/free-solid-svg-icons';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {composeAddress} from '../../utils/utils'
import {APP_PAGE_URLS } from '../../utils/constants'
import AfButton from '../../components/Button/Button';
import AfModal from '../../components/Modal/Modal';
import {BUTTON_TYPES} from '../../utils/constants';
import { deleteUser } from '../../redux/actions/userActions';
import ServiceActions from '../../redux/actions/ServiceActions';

const Services = () => {
  const { t: translate } = useTranslation();
  const history = useHistory();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services);
  const [showModal, setShowModal] = useState(false);
  const [showModalStaff, setShowModalStaff] = useState(false);
  const [serviceIdInModal, setServiceIdInModal] = useState();
  const [staffIdInModal, setStaffIdInModal] = useState();
  const users = useSelector((state) => state.user.users);

  function handleClose() {
    setShowModal(false);
  }

  function handleCloseStaffModal() {
    setShowModalStaff(false);
  }

  function handleDelete(serviceId) {
    console.log(serviceId);
    dispatch(ServiceActions.deleteService(serviceId))
    .then((res) => {
      setShowModal(false);
    });
  }

  const handleDeleteStaffSubmit = (id) => {
    dispatch(deleteUser(id))
      .then((res) => {
        setShowModalStaff(false);
      });
  }

  const handleOpenModal = (serviceIdSelected) => {
    setShowModal(true);
    setServiceIdInModal(serviceIdSelected);
  };

  const handleOpenStaffModal = (serviceIdSelected) => {
    setShowModalStaff(true);
    setStaffIdInModal(serviceIdSelected);
  };


  return (
  <>
    <AfPage 
      title={translate('SERVICES.title')}
      icon={faHome}
      buttonText={translate('SERVICES.buttonText')}
      buttonIcon={faBuilding}
      buttonClick={() => { history.push(`${path.replace('/services', '')}/${APP_PAGE_URLS.addService}`); }}
    >
      {services.length > 0 ? 
        <table>
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
                const staff = users.find((user) => user.serviceId === locationItem.id);
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
                    <td>{locationItem.open ? "YES" : "NO"}</td>
                    <td>
                      <div className="action-buttons">
                        <AfButton
                          text={translate('BUTTONS.edit')}
                          buttonIcon={faEdit}
                          onClick={() => {
                            history.push({
                              pathname: `${path.replace('/services', '')}/${APP_PAGE_URLS.editService}/${locationItem?.id}`,
                            });
                          }}
                          buttonType={BUTTON_TYPES.primary}
                          small
                        />
                        <AfButton 
                          text={translate('BUTTONS.delete')}
                          buttonIcon={faTimes} 
                          onClick={() => handleOpenModal(locationItem?.id)} 
                          buttonType={BUTTON_TYPES.remove} small 
                        />
                        {!staff 
                        ? <AfButton
                          text={translate('BUTTONS.addStaff')}
                          buttonIcon={faAdd}
                          onClick={() => {
                            history.push({
                              pathname: `${path.replace('/services', '')}/register/${locationItem?.id}`,
                            });
                          }}
                          buttonType={BUTTON_TYPES.add}
                          small
                        />
                        : <AfButton
                        text={translate('BUTTONS.deleteStaff')}
                        buttonIcon={faAdd}
                        onClick={() => {
                          handleOpenStaffModal(staff?.id);
                        }}
                        buttonType={BUTTON_TYPES.remove}
                        small
                      />
                        }
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
        "You have no service in the database"
        }
         <AfModal show={showModal} title={translate("MODAL.deleteTitle")} onClose={handleClose} onSave={() => handleDelete(serviceIdInModal)} text={translate("MODAL.confirmMessage")} />
         <AfModal show={showModalStaff} title={translate("MODAL.deleteTitle")} onClose={handleCloseStaffModal} onSave={() => handleDeleteStaffSubmit(staffIdInModal)} text={translate("MODAL.confirmMessage")} />
    </AfPage>
  </>
  )
}

export default Services;