import React, { useState, useEffect } from 'react';
import RbInput from '../../components/Input/Input';
import RbDropDown from '../../components/Dropdown/Dropdown';
import RbButton from '../../components/Button/Button';
import registerActions from '../../redux/actions/registerActions';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faMobileAlt, faAdd, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router-dom';
import {
  PHONE_NUMBER_FORMAT_REGEX, BUTTON_TYPES, USER_TYPE, ID_CARD_FORMAT_REGEX
} from '../../utils/constants';
import AppLogo from '../../components/AppLogo/AppLogo';
import AppVersion from '../../components/AppVersion/AppVersion';
import { useDispatch, useSelector } from 'react-redux';
import loginActions from '../../redux/actions/loginActions';
import { resetUser } from '../../redux/actions/userActions';
import './style.scss';
import AfPage from '../../components/Page/Page';

const Register = () => {

  const { t: translate } = useTranslation();
  const {
    register, handleSubmit, formState: { errors }, watch,
  } = useForm();
  const dispatch = useDispatch();
  const { serviceId } = useParams();

  const currentUserInfo = useSelector((state) => state.user.currentUser);
  // const isAccountUpdate = (currentUserInfo !== null);
  const isLoggedIn = useSelector((state) => state.login.loggedIn);
  const registerError = useSelector((state) => state.register?.registerError);
  const [userType, setUserType] = useState(USER_TYPE.client.toString());

  useEffect(() => {
    dispatch(loginActions.deleteError());
    // dispatch(registerActions.deleteError());

    if (isLoggedIn && currentUserInfo.role === USER_TYPE.admin.toString()) {
      setUserType(USER_TYPE.staff.toString());
    }
  }, []);


  const onSubmit = (data) => {
    const newData = {
      ...data,
      serviceId: !serviceId ? null : serviceId,
      userRole: !serviceId ? USER_TYPE.client.toString() : USER_TYPE.staff.toString()
    }
      dispatch(registerActions.register(newData))
      .then((res) => {
        if(!serviceId)
          history.push('/login');
        else history.push('/admin/services');
      })
  };
  const history = useHistory();
  const password = watch('password', '');


  const dropdownValues = [{
    label: translate('REGISTER.admin'),
    value: USER_TYPE.admin.toString(),
  },
  {
    label: translate('REGISTER.client'),
    value: USER_TYPE.client.toString(),
  },
  ];

  const cancelBtnClick = () => {
    // if (isAccountUpdate) {
    //   dispatch(resetUser());
    // }
    history.goBack();
  };

  const usernameValidationRules = {
    required: {
      value: true,
      message: translate('REGISTER.userError'),
    },
    maxLength: 32,
  };

  const userRoleValidationRules = {
    required: {
      value: true,
      message: translate('REGISTER.userRoleError'),
    },
  };

  const firstNameValidationRules = {
    required: {
      value: true,
      message: translate('REGISTER.firstNameError'),
    },
    maxLength: 64,
  };

  const lastNameValidationRules = {
    required: {
      value: true,
      message: translate('REGISTER.lastNameError'),
    },
    maxLength: 64,
  };

  const passwordValidationRules = {
    required: {
      value: true,
      message: translate('REGISTER.passError'),
    },
  };

  const confirmPassValidationRules = {
    required: {
      value: true,
      message: translate('REGISTER.confirmPassError'),
    },
    validate: (value) => value === password || translate('REGISTER.passMatchError'),
  };

  const phoneValidationRules = {
    required: {
      value: true,
      message: translate('REGISTER.phoneNumberRequired'),
    },
    maxLength: {
      value: 12,
      message: translate('REGISTER.phoneLengthError'),
    },
    pattern: {
      value: PHONE_NUMBER_FORMAT_REGEX,
      message: translate('REGISTER.onlyDigitsError'),
    },
  };


  return (
    <>
      {serviceId ? 
      <AfPage
        title="Create staff account"
        icon={faAdd}
      >
      <div className="authentication-page-container">
        <form className="register-container" onSubmit={handleSubmit(onSubmit)}>
            {/* {isAccountUpdate && (
              <div className="complete-account">
                {translate('REGISTER.completeAccount')}
              </div>
            )} */}
            <div className="input-wrapper">
              <div className="row-elements">
                <div className="child-element">
                  <RbInput
                    // disabled={isAccountUpdate}
                    // defaultValue={isAccountUpdate ? currentUserInfo.email : ''}
                    // readOnly={isAccountUpdate}
                    placeholder={translate('LOGIN.userPlaceholder')}
                    label={translate('REGISTER.username')}
                    labelIcon={faEnvelope}
                    required
                    errorMessage={errors.username && errors.username.message}
                    {...register('username', usernameValidationRules)}
                  />
                </div>

                <div className="child-element">
                  <RbInput
                    placeholder={translate('REGISTER.phone')}
                    label={translate('REGISTER.phone')}
                    labelIcon={faMobileAlt}
                    errorMessage={errors.phone && errors.phone.message}
                    {...register('phone', phoneValidationRules)}
                  />
                </div>
              </div>

              <div className="row-elements">
                <div className="child-element">
                  <RbInput
                    placeholder={translate('REGISTER.firstName')}
                    label={translate('REGISTER.firstName')}
                    labelIcon={faUser}
                    required
                    errorMessage={errors.firstName && errors.firstName.message}
                    {...register('firstName', firstNameValidationRules)}
                  />
                </div>

                <div className="child-element">
                  <RbInput
                    placeholder={translate('REGISTER.lastName')}
                    label={translate('REGISTER.lastName')}
                    labelIcon={faUser}
                    required
                    errorMessage={errors.lastName && errors.lastName.message}
                    {...register('lastName', lastNameValidationRules)}
                  />
                </div>
              </div>

              <div className="row-elements">
                <div className="child-element">
                  <RbInput
                    placeholder={translate('REGISTER.password')}
                    label={translate('REGISTER.password')}
                    labelIcon={faLock}
                    required
                    errorMessage={errors.password && errors.password.message}
                    type="password"
                    {...register('password', passwordValidationRules)}
                  />
                </div>

                <div className="child-element">
                  <RbInput
                    type="password"
                    placeholder={translate('REGISTER.confirmPass')}
                    label={translate('REGISTER.confirmPass')}
                    labelIcon={faLock}
                    required
                    errorMessage={errors.confirmPass && errors.confirmPass.message}
                    {...register('confirmPass', confirmPassValidationRules)}
                  />
                </div>
              </div>

              {/* <div className="row-elements">
                <div className="child-element">
                  <RbInput
                    placeholder={translate('REGISTER.phone')}
                    label={translate('REGISTER.phone')}
                    labelIcon={faMobileAlt}
                    errorMessage={errors.phone && errors.phone.message}
                    {...register('phone', phoneValidationRules)}
                  />
                </div>

              </div> */}
              <div className="row-elements">

                <div className="child-element">
                  <div className="buttons-container">
                    <div className="btn-cancel">
                      <RbButton text={translate('REGISTER.cancel')} buttonType={BUTTON_TYPES.secondary} onClick={cancelBtnClick} />
                    </div>
                    <div className="btn-register">
                      <RbButton
                        // text={isAccountUpdate ? translate('REGISTER.updateAccount') : translate('REGISTER.register')}
                        text={translate('REGISTER.register')}
                        type="submit"
                        buttonType={BUTTON_TYPES.primary}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {registerError && <div className="error-message">{translate('REGISTER.emailError')}</div>}
            </div>
          </form>
      </div>
      </AfPage> 
      :
      <div className="authentication-page-container">
        <div className="logo-container">
          <AppLogo logoClass="login-logo" />
        </div>
        <form className="register-container margin-top" onSubmit={handleSubmit(onSubmit)}>
            {/* {isAccountUpdate && (
              <div className="complete-account">
                {translate('REGISTER.completeAccount')}
              </div>
            )} */}
            <div className="input-wrapper">
              <div className="row-elements">
                <div className="child-element">
                  <RbInput
                    // disabled={isAccountUpdate}
                    // defaultValue={isAccountUpdate ? currentUserInfo.email : ''}
                    // readOnly={isAccountUpdate}
                    placeholder={translate('LOGIN.userPlaceholder')}
                    label={translate('REGISTER.username')}
                    labelIcon={faEnvelope}
                    required
                    errorMessage={errors.username && errors.username.message}
                    {...register('username', usernameValidationRules)}
                  />
                </div>

                <div className="child-element">
                  <RbInput
                    placeholder={translate('REGISTER.phone')}
                    label={translate('REGISTER.phone')}
                    labelIcon={faMobileAlt}
                    errorMessage={errors.phone && errors.phone.message}
                    {...register('phone', phoneValidationRules)}
                  />
                </div>
              </div>

              <div className="row-elements">
                <div className="child-element">
                  <RbInput
                    placeholder={translate('REGISTER.firstName')}
                    label={translate('REGISTER.firstName')}
                    labelIcon={faUser}
                    required
                    errorMessage={errors.firstName && errors.firstName.message}
                    {...register('firstName', firstNameValidationRules)}
                  />
                </div>

                <div className="child-element">
                  <RbInput
                    placeholder={translate('REGISTER.lastName')}
                    label={translate('REGISTER.lastName')}
                    labelIcon={faUser}
                    required
                    errorMessage={errors.lastName && errors.lastName.message}
                    {...register('lastName', lastNameValidationRules)}
                  />
                </div>
              </div>

              <div className="row-elements">
                <div className="child-element">
                  <RbInput
                    placeholder={translate('REGISTER.password')}
                    label={translate('REGISTER.password')}
                    labelIcon={faLock}
                    required
                    errorMessage={errors.password && errors.password.message}
                    type="password"
                    {...register('password', passwordValidationRules)}
                  />
                </div>

                <div className="child-element">
                  <RbInput
                    type="password"
                    placeholder={translate('REGISTER.confirmPass')}
                    label={translate('REGISTER.confirmPass')}
                    labelIcon={faLock}
                    required
                    errorMessage={errors.confirmPass && errors.confirmPass.message}
                    {...register('confirmPass', confirmPassValidationRules)}
                  />
                </div>
              </div>

              {/* <div className="row-elements">
                <div className="child-element">
                  <RbInput
                    placeholder={translate('REGISTER.phone')}
                    label={translate('REGISTER.phone')}
                    labelIcon={faMobileAlt}
                    errorMessage={errors.phone && errors.phone.message}
                    {...register('phone', phoneValidationRules)}
                  />
                </div>

              </div> */}
              <div className="row-elements">

                <div className="child-element">
                  <div className="buttons-container">
                    <div className="btn-cancel">
                      <RbButton text={translate('REGISTER.cancel')} buttonType={BUTTON_TYPES.secondary} onClick={cancelBtnClick} />
                    </div>
                    <div className="btn-register">
                      <RbButton
                        // text={isAccountUpdate ? translate('REGISTER.updateAccount') : translate('REGISTER.register')}
                        text={translate('REGISTER.register')}
                        type="submit"
                        buttonType={BUTTON_TYPES.primary}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {registerError && <div className="error-message">{translate('REGISTER.emailError')}</div>}
            </div>
          </form>
        <AppVersion />
      </div>}
    </>
      
  )
}

export default Register;