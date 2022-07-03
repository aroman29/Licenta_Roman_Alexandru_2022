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
import carActions from '../../redux/actions/carActions';
import '../../features/Services/style.scss';

const AddCarRepair = () => {

  const { t: translate } = useTranslation();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { carId } = useParams();

  const selectedService = useSelector((state) => state.service.selectedService);

  const onSubmit = (data) => {

    console.log(data);
    dispatch(carActions.addCarRepair(data, carId))
      .then(() => {
        history.push(`/${APP_PAGE_URLS.adminCars}`);
      });

  };

  const nameValidationRules = {
    required: {
      value: true,
      message: translate('SERVICES.nameRequired'),
    },
  };

  const descripitonValidationRules = {
    required: {
      value: true,
      message: translate('SERVICES.descripitonRequired'),
    },
  };

  const priceValidationRules = {
    required: {
      value: true,
      message: translate('SERVICES.priceRequired'),
    },
  };

  const durationValidationRules = {
    required: {
      value: true,
      message: translate('SERVICES.durationRequired'),
    },
  };

  return (
    <RbPage
      title={translate('CAR_SUMMARY.addCarRepair')}
      icon={faBuilding}
      buttonClick={() => {}}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="add-service">

            <div className="service-inputs">

              <RbInput
                label={translate('CAR_SUMMARY.addRepair.name')}
                errorMessage={errors.name && errors.name.message}
                labelIcon={faEnvelope}
                required
                {...register('name', nameValidationRules)}
              />

              <RbInput
                label={translate('CAR_SUMMARY.addRepair.description')}
                errorMessage={errors.description && errors.description.message}
                labelIcon={faEnvelope}
                {...register('description', descripitonValidationRules)}
              />

              <RbInput
                label={translate('CAR_SUMMARY.addRepair.price')}
                errorMessage={errors.price && errors.price.message}
                labelIcon={faEnvelope}
                required
                {...register('price', priceValidationRules)}
              />

              <RbInput
                label={translate('CAR_SUMMARY.addRepair.duration')}
                errorMessage={errors.duration && errors.duration.message}
                labelIcon={faEnvelope}
                required
                {...register('duration', durationValidationRules)}
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

export default AddCarRepair;
