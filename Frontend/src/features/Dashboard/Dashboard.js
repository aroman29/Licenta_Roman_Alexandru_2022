import React, { useEffect, useState } from 'react';
import AfPage from '../../components/Page/Page';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faHome, faWarning, faEdit } from '@fortawesome/free-solid-svg-icons';
import Maps from '../../components/Map/Map';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { composeLocation } from '../../utils/utils';
import { CustomPickersDay } from '../../utils/muiStyles';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import add from 'date-fns/add';
import { BUTTON_TYPES } from '../../utils/constants';
import startOfWeek from 'date-fns/startOfWeek';
import { useHistory, useParams,useRouteMatch } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './style.scss';
import AfInput from '../../components/Input/Input';
import AfButton from '../../components/Button/Button';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import serviceActions from '../../redux/actions/ServiceActions';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import moment from 'moment';

const Dashboard = () => {

  const { t: translate } = useTranslation();
  const selectedService = useSelector((state) => state.service?.selectedService);
  const currentUser = useSelector((state) => state.user?.currentUser);
  const [weekSlot, setWeekSlot] = React.useState(new Date());
  const [dateSelectedForLimit, setDateSelectedForLimit] = useState(new Date());
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [reservationLimitEdit, setReservationLimitEdit] = useState(false);
  const [customReservationEdit, setCustomReservationEdit] = useState(false);
  const serviceReservationLimit = useSelector((state) => state.service.services).find((service) => service.id === selectedService.id)?.reservationLimit;
  const [limit, setLimit] = useState(false);
  const history = useHistory();

  const [limitSelectType, setLimitSelectType] = useState('day');

  useEffect(() => {
    dispatch(serviceActions.getLimitByDateInService(moment(new Date()).format('YYYY-MM-DD'), selectedService?.id))
    .then((res) => {
      setLimit(res);
    });
  }, []);

  const handleType = (event) => {
    console.log(weekSlot);
      setLimitSelectType(event.target.value);
  };

  const viewLimitOnChange = (newValue) => {
    console.log(moment(newValue).format('YYYY-MM-DD'), selectedService?.id);
    setDateSelectedForLimit(newValue);
    dispatch(serviceActions.getLimitByDateInService(moment(newValue).format('YYYY-MM-DD'), selectedService?.id))
      .then((res) => {
        setLimit(res);
      });
  }

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!weekSlot) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = startOfWeek(weekSlot);
    const end = endOfWeek(weekSlot);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  const onSubmitLimit = async (data) => {

    await dispatch(serviceActions.editService(selectedService.id,
      selectedService.city, selectedService.address, selectedService.lat, selectedService.lng, data.reservationDayLimit))
      .then(() => {
        setReservationLimitEdit(false);
      });
      await dispatch(serviceActions.getLimitByDateInService(moment(new Date()).format('YYYY-MM-DD'), selectedService?.id))
    .then((res) => {
      setLimit(res);
    });

  };

  const onSubmitCustomLimit = (data) => {

    const start = startOfWeek(weekSlot);
    const end = endOfWeek(weekSlot);

    
    if (limitSelectType === "day") {
      dispatch(serviceActions.addCustomReservationLimit(selectedService.id, moment(weekSlot).format('YYYY-MM-DD'), data.customReservationDayLimit));
    } else {
      const day2 = add(start, { days: 1 })
      const day3 = add(day2, { days: 1 })
      const day4 = add(day3, { days: 1 })
      const day5 = add(day4, { days: 1 })
      const day6 = add(day5, { days: 1 })

      dispatch(serviceActions.addWeekCustomReservationLimit(
        selectedService.id,
        moment(start).format('YYYY-MM-DD'),
        moment(day2).format('YYYY-MM-DD'),
        moment(day3).format('YYYY-MM-DD'),
        moment(day4).format('YYYY-MM-DD'),
        moment(day5).format('YYYY-MM-DD'),
        moment(day6).format('YYYY-MM-DD'),
        moment(end).format('YYYY-MM-DD'),
        data.customReservationDayLimit
      ));
    }
    setCustomReservationEdit(false);

  };

  const reservationDayLimitValidationRules = {
    required: {
      value: true,
      message: translate('DASHBOARD.reservationDayLimitRequired'),
    },
  };

  const customReservationDayLimitValidationRules = {
    required: {
      value: true,
      message: translate('DASHBOARD.reservationDayLimitRequired'),
    },
  };

  const changeEditMode = () => {
    console.log("sdfhbaosyifdhoasidfghiasdf");
    setEditMode(!editMode)
  }
   
  return (
  <>
    <AfPage 
      title={`${translate('DASHBOARD.welcome')}, ${currentUser.firstName}!`}
      icon={faHome}
      buttonText={editMode ? "Custom mode" : "View mode"}
      buttonClick={changeEditMode}
    >
      <div className="page-content" >
      {selectedService
      ? 
        <>
          <div className="location-title" >
            {composeLocation(selectedService.address, selectedService.city)}
          </div>
          <div className="maps"></div>
          <Maps coords={{lat: Number(selectedService.lat), lng: Number(selectedService.lng)}} />

          {(!editMode)
            ? ( 
              <div className="view-limit-wrapper">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    label="Week picker"
                    value={dateSelectedForLimit}
                    onChange={viewLimitOnChange}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="'Week of' MMM d"
                  />
                </LocalizationProvider>
                <div className='view-limit-info'>
                  Reservation limit for
                  <div className='important'>{moment(dateSelectedForLimit.toString()).format('YYYY-MM-DD')}</div>
                  is:
                  <div className='important'>{limit}</div>
                  </div>
              </div> 
            )
            : <div className="reservation-limit-wrapper">
              { !reservationLimitEdit 
                ? ( 
                  <div className="reservation-limit">
                    <div className="reservation-limit-info">
                      Maximum number of reservations /day: <div className="limit-info">{serviceReservationLimit}</div>
                    </div> 
                    <AfButton
                      small
                      text={translate('BUTTONS.edit')}
                      labelIcon={faEdit}
                      onClick={() => {setReservationLimitEdit(true)}}
                    />
                  </div>
                
                ) : 
                <form onSubmit={handleSubmit(onSubmitLimit)} >
                  <div className="form-content">
                    <AfInput
                      small
                      label={translate('DASHBOARD.reservationDayLimitLabel')}
                      errorMessage={errors.reservationDayLimit && errors.reservationDayLimit.message}
                      labelIcon={faWarning}
                      placeholder='type here..'
                      {...register('reservationDayLimit', reservationDayLimitValidationRules)}
                    />

                    
                  </div>
                  <div className="buttons">
                    <AfButton text={translate('COMMANDS.save')} type="submit" buttonType={BUTTON_TYPES.primary} />
                    <AfButton text={translate('COMMANDS.cancel')} buttonType={BUTTON_TYPES.secondary} onClick={() => setReservationLimitEdit(false)} />
                  </div>
                </form>
                }

                {!customReservationEdit 
                ? ( 
                  <div className="reservation-limit-custom">
                    <div className="reservation-limit-info">{translate('DASHBOARD.customReservationInfo')}</div>
                    <div>
                      <AfButton
                        small
                        text={translate('BUTTONS.custom')}
                        labelIcon={faEdit}
                        onClick={() => {setCustomReservationEdit(true)}}
                      />
                    </div>
                  </div>
                
                ) :
                <form onSubmit={handleSubmit(onSubmitCustomLimit)} >
                  <div className="form-content">
                    <div className="form-content-custom">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                          displayStaticWrapperAs="desktop"
                          label="Week picker"
                          value={weekSlot}
                          onChange={(newValue) => {
                            setWeekSlot(newValue);
                          }}
                          renderDay={limitSelectType === 'week' ? renderWeekPickerDay : null}
                          renderInput={(params) => <TextField {...params} />}
                          inputFormat="'Week of' MMM d"
                        />
                      </LocalizationProvider>

                      <ToggleButtonGroup
                        value={limitSelectType}
                        aria-label="device"
                      >
                        <ToggleButton value="day" aria-label="day" onClick={handleType}>
                          Select by day
                        </ToggleButton>
                        <ToggleButton value="week" aria-label="week" onClick={handleType}>
                          Select by week
                        </ToggleButton>

                      </ToggleButtonGroup>
                    </div>

                    <AfInput
                      small
                      label={translate('DASHBOARD.reservationDayLimitLabel')}
                      errorMessage={errors.customReservationDayLimit && errors.customReservationDayLimit.message}
                      labelIcon={faWarning}
                      placeholder='type here..'
                      {...register('customReservationDayLimit', customReservationDayLimitValidationRules)}
                    />

                  </div>

                  <div className="buttons">
                    <AfButton text={translate('COMMANDS.save')} type="submit" buttonType={BUTTON_TYPES.primary} />
                    <AfButton text={translate('COMMANDS.cancel')} buttonType={BUTTON_TYPES.secondary} onClick={() => setCustomReservationEdit(false)} />
                  </div>
                </form>
              }
              
          </div>}

        </>
      :
       "You have no services in the database"}
        
      </div>
    </AfPage>
  </>
  )
}

export default Dashboard;
