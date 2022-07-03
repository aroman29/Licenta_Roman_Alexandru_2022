import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { faEnvelope, faBuilding } from '@fortawesome/free-regular-svg-icons';
import { APP_PAGE_URLS, BUTTON_TYPES } from '../../utils/constants';
import RbInput from '../../components/Input/Input';
import RbPage from '../../components/Page/Page';
import RbButton from '../../components/Button/Button';
import serviceActions from '../../redux/actions/ServiceActions';
import '../../features/Services/style.scss';

const AddEditService = () => {

  const { t: translate } = useTranslation();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { serviceId } = useParams();

  const selectedService = useSelector((state) => state.service.services.find(
    (service) => service.id.toString() === serviceId,
  ));

  const onSubmit = (data) => {
    if (!serviceId) {
      console.log(data);
      dispatch(serviceActions.addService(data.address, data.city, data.lat, data.lng, data.reservationLimit))
        .then(() => {
          history.push(`/${APP_PAGE_URLS.adminServices}`);
        });
      } 
    else {
      dispatch(serviceActions.editService(serviceId,
        data.city, data.address, data.lat, data.lng, data.reservationLimit))
        .then(() => {
          history.push(`/${APP_PAGE_URLS.adminServices}`);
        });
    }
  };

  const addressValidationRules = {
    required: {
      value: true,
      message: translate('SERVICES.addressError'),
    },
  };

  const cityValidationRules = {
    required: {
      value: true,
      message: translate('SERVICES.cityError'),
    },
  };

  const latValidationRules = {
    required: {
      value: true,
      message: translate('SERVICES.latError'),
    },
  };

  const lngValidationRules = {
    required: {
      value: true,
      message: translate('SERVICES.lngError'),
    },
  };

  const reservationLimitValidationRules = {
    required: {
      value: true,
      message: translate('SERVICES.reservationLimitError'),
    },
  };

  return (
    <RbPage
      title={!serviceId ? translate('SERVICES.buttonText') : translate('SERVICES.editService')}
      icon={faBuilding}
      buttonClick={() => {}}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="add-service">

            <div className="service-inputs">

              <RbInput
                label={translate('SERVICES.city')}
                errorMessage={errors.city && errors.city.message}
                labelIcon={faEnvelope}
                required
                defaultValue={serviceId ? selectedService.city : ''}
                {...register('city', cityValidationRules)}
              />

              <RbInput
                label={translate('SERVICES.address')}
                errorMessage={errors.address && errors.address.message}
                labelIcon={faEnvelope}
                defaultValue={serviceId ? selectedService.address : ''}
                {...register('address', addressValidationRules)}
              />

              <RbInput
                label={translate('SERVICES.lat')}
                errorMessage={errors.lat && errors.lat.message}
                labelIcon={faEnvelope}
                required
                defaultValue={serviceId ? selectedService.lat : ''}
                {...register('lat', latValidationRules)}
              />

              <RbInput
                label={translate('SERVICES.lng')}
                errorMessage={errors.lng && errors.lng.message}
                labelIcon={faEnvelope}
                required
                defaultValue={serviceId ? selectedService.lng : ''}
                {...register('lng', lngValidationRules)}
              />

              
              <RbInput      
                label={translate('SERVICES.reservationLimit')}
                errorMessage={errors.reservationLimit && errors.reservationLimit.message}
                labelIcon={faEnvelope}
                required
                defaultValue={serviceId ? selectedService.reservationLimit : ''}
                {...register('reservationLimit', reservationLimitValidationRules)}
              />

            </div>
          </div>
          <div className="buttons">
            <RbButton text={translate('COMMANDS.save')} type="submit" buttonType={BUTTON_TYPES.primary} />
            <RbButton text={translate('COMMANDS.cancel')} buttonType={BUTTON_TYPES.secondary} onClick={() => history.goBack()} />
          </div>
        </div>
      </form>
    </RbPage>
  );
};

export default AddEditService;
