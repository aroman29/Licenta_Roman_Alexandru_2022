import React, {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ServiceActions from '../../redux/actions/ServiceActions';
import { composeLocation } from '../../utils/utils';
// import { LOCATION_RENTAL_STATUSES } from '../../utils/constants';


function AppointedLocation() {

  const { t: translate } = useTranslation();
  const dispatch = useDispatch();

  const services = useSelector((state) => state.service.services);
  const [selectedService, setSelectedService] = useState({});
  const selectedServiceId = useSelector((state) => state.user.currentUser.serviceId);

  useEffect((state) => {
    setSelectedService(services.find((service) => service.id === selectedServiceId));
  }, [])

  return (
    <div className="rented-location-component">
      <p>
        {composeLocation(selectedService?.address, selectedService?.city)}
      </p>
    </div>
  );
}

export default AppointedLocation;
