import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ServiceActions from '../../redux/actions/ServiceActions';
import { composeLocation } from '../../utils/utils';
// import { LOCATION_RENTAL_STATUSES } from '../../utils/constants';
import PropTypes from 'prop-types';
import '../../components/Input/style.scss';

const LocationDropdown = ({ readOnly }) => {
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();

  const services = useSelector((state) => state.service.services);
  const defaultService = services.length > 0 ? services[0] : '';
  const selectedService = useSelector((state) => state.service.selectedService);

  // const activecontracts = useSelector((state) => state.contract.contracts)
  //   .filter((contract) => {
  //     if (contract.status === LOCATION_RENTAL_STATUSES.rented
  //       || contract.status === LOCATION_RENTAL_STATUSES.pending) {
  //       return true;
  //     } return false;
  //   });

  // const findContractForLocation = (location) => {
  //   const contractForLocation = activecontracts
  //     .find((activeContract) => (activeContract.locationId === location.id));
  //   if (contractForLocation) {
  //     if (contractForLocation.status === LOCATION_RENTAL_STATUSES.rented) {
  //       return LOCATION_RENTAL_STATUSES.rented;
  //     }
  //     if (contractForLocation.status === LOCATION_RENTAL_STATUSES.pending) {
  //       return LOCATION_RENTAL_STATUSES.pending;
  //     }
  //   }
  //   return 0;
  // };


  return (
    services.length > 0 && (
      <div className="dropdown-component topbar-component">
        {translate('SERVICES.managedService')}
        <select
          disabled={readOnly}
          name="properties"
          onChange={(e) => {
            console.log("onchange activated", services.find((service) => service.id.toString() === e.target.value).id);
            dispatch(ServiceActions.setSelectedService(
              services.find((service) => service.id.toString() === e.target.value),
            ));
          }}
          value={selectedService ? selectedService.id : defaultService}
        >
          <option value="" disabled> </option>
          {services.map((location) => (
            (location.address)
              ? (
                <option key={location.id} value={location.id}>
                  {composeLocation(location.address,
                    location.city)}
                </option>
              ) : ''
          ))}
        </select>
      </div>
    )
  );
};

LocationDropdown.propTypes = {
  readOnly: PropTypes.bool.isRequired,
};

export default LocationDropdown;
