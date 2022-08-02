import React, { useRef, useState, useEffect } from 'react';
import AfInput from '../../components/Input/Input';
import AfButton from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import AppLogo from '../../components/AppLogo/AppLogo';
import Appversion from '../../components/AppVersion/AppVersion';
import { useHistory } from 'react-router-dom';
import loginActions from '../../redux/actions/loginActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  APP_PAGE_URLS, BUTTON_TYPES, LOGIN_INPUT_TYPES, USER_TYPE
} from '../../utils/constants';
import './style.scss';

const Login = () => {

  const { t: translate } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [inputIcon, setInputIcon] = useState(faEye);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useSelector((state) => state.user.currentUser);
  const loginError = useSelector((state) => state.login.loginError);
  const history = useHistory();

  useEffect(() => {
    if (userInfo && userInfo.firstName && userInfo.lastName) {
      dispatch(loginActions.loginSuccess());
    }
  }, [userInfo]);

  const onSubmit = (data) => {
    setIsLoading(true);
    console.log(data.username, data.password);
    dispatch(loginActions.login(data.username, data.password))
      .then((user) => {
        console.log(user);
        setIsLoading(false);
        if (user.role === USER_TYPE.admin.toString()) {
          history.push('/admin/dashboard');
        } else if (user.role === USER_TYPE.client.toString()) {
          history.push('/');
        } else if (user.role === USER_TYPE.staff.toString()) {
          history.push('/admin/dashboard');
        }
        
      });
  };

  const usernameValidationRules = {
    required: {
      value: true,
      message: translate('LOGIN.userError'),
    },
  };

  const passwordValidationRules = {
    required: {
      value: true,
      message: translate('LOGIN.passError'),
    },
  };

  const handleIconClick = () => {
    if (inputIcon === faEye) {
      setInputIcon(faEyeSlash);
      passwordRef.current.type = LOGIN_INPUT_TYPES.text;
    } else {
      setInputIcon(faEye);
      passwordRef.current.type = LOGIN_INPUT_TYPES.password;
    }
  };


  return (

    <div className="authentication-page-container">
    <div className="logo-container">
      <AppLogo />
    </div>
    <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <AfInput
            className="input-container"
            {...register('username', usernameValidationRules)}
            placeholder={translate('LOGIN.userPlaceholder')}
            label={translate('LOGIN.username')}
            labelIcon={faEnvelope}
            required
            errorMessage={errors.username && errors.username.message}
          />

          <AfInput
            className="input-container"
            {...register('password', passwordValidationRules)}
            placeholder={translate('LOGIN.password')}
            label={translate('LOGIN.password')}
            labelIcon={faLock}
            required
            errorMessage={errors.password && errors.password.message}
            type='password'
            inputIcon={inputIcon}
            inputIconClick={handleIconClick}
            // ref={passwordRef}
          />

          <AfInput
            text={translate('LOGIN.signInLink')}
            type="submit"
            buttonType='primary'
            loading={isLoading}
          />

          <AfButton text={translate('LOGIN.registerLink')} buttonType='secondary' onClick={() => history.push(`/${APP_PAGE_URLS.register}`) } />

          {loginError && <div className="error-message">{translate('LOGIN.loginError')}</div>}
        </form>
  </div>
    <Appversion />
    </div>
  )
}

export default Login;