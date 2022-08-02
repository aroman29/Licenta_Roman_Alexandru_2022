import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { faEnvelope, faBuilding } from '@fortawesome/free-regular-svg-icons';
import { APP_PAGE_URLS, BUTTON_TYPES, USER_TYPE } from '../../utils/constants';
import RbInput from '../../components/Input/Input';
import RbPage from '../../components/Page/Page';
import RbButton from '../../components/Button/Button';
import carActions from '../../redux/actions/carActions';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import AfPage from '../../components/Page/Page';
import CarSummary from '../../components/CarSummary/CarSummary';
import './style.scss';

const Cars = () => {

  const { t: translate } = useTranslation();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { serviceId } = useParams();
  const currentUser = useSelector((state) => state.user?.currentUser);

  // const selectedService = useSelector((state) => state.service?.services.find(
  //   (service) => service.id.toString() === serviceId,
  // ));
  const selectedService = useSelector((state) => state.service?.selectedService);
  const cars = useSelector((state) => state.car?.cars).filter((car) => {
    if(currentUser.role !== USER_TYPE.client.toString()){
      console.log(car.serviceId, selectedService, selectedService?.id);
      return car.serviceId === selectedService?.id;
    } else {
      return car.userId === currentUser.id;
    }
  });
  
  useEffect(() => {
    dispatch(carActions.getCars());
  }, []);

 return (
  <AfPage
    title="Cars in service"
    icon={faCar}
  >
    <div className='cars-page-wrapper'>
      <div className='cars-filters'>
        filters
      </div>
      <div className='cars-wrapper'>
        <div className='cars-container'>
          {currentUser.role === USER_TYPE.client.toString()
          ? cars.filter((car) => car?.userId === currentUser?.id).map((car) => (<CarSummary summary={car} />)) 
          : cars.map((car) => (<CarSummary summary={car} />))}
        </div>
        <div className='cars-container'>
          
        </div>
      </div>
    </div>
  </AfPage>
  );
}

export default Cars;