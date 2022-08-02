import React, { useEffect, useState } from 'react';
import AfPage from '../../components/Page/Page';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router-dom';
import Maps from '../../components/Map/Map';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { composeLocation } from '../../utils/utils';
import AfModal from '../../components/Modal/Modal';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import moment from 'moment';
import { CustomClientPickersDay } from '../../utils/muiStyles';
import TextField from '@mui/material/TextField';
import serviceActions from '../../redux/actions/ServiceActions';
import './style.scss';

const ServiceDetails = () => {

  const { t: translate } = useTranslation();
  const history = useHistory();
  const { serviceId } = useParams();
  const currentService = useSelector((state) => state.service.services).find((service) => service.id === serviceId);
  const loggedIn = useSelector((state) => state.login?.loggedIn);
  console.log(loggedIn);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  console.log(currentService);
  const [selectedDate, setSelectedDate] = useState(new Date('2022-07-29'));
  const [selectedDateError, setSelectedDateError] = useState(false);
  const reservations = useSelector((state) => state.reservation?.cars);
  const selectedService = useSelector((state) => state.service.services.find(
    (service) => service.id.toString() === serviceId,
  ));
  const [customReservationLimitsInservice, setCustomReservationLimitsInservice] = useState([]);

  const onChangeSlot = (newValue) => {
    const formattedDate =  moment(newValue).format('YYYY-MM-DD');
    setSelectedDate(newValue);
 
  }

  useEffect(() => {
    dispatch(serviceActions.getCustomServieLimits(serviceId))
      .then((res) => {
        // console.log(res);
        setCustomReservationLimitsInservice(res);
      });
  }, []);

  function disableWeekends(date) {
    const currentDate = new Date();
    const pastDates = currentDate.getTime() > date.getTime();
    const farDates = currentDate.getTime() + 2629800000 < date.getTime();
    return date.getDay() === 0 || date.getDay() === 6 || pastDates || farDates;
  }

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!selectedDate) {
      return <PickersDay {...pickersDayProps} />;
    }

    const formattedDate =  moment(date).format('YYYY-MM-DD');
    let dayIsFull = false;
    let reservationsMade = 0;

    var limit  = selectedService?.reservationLimit;

    const customLimitForDay = customReservationLimitsInservice
      .find((customReservation) => customReservation?.date.toString().substring(0,10) === formattedDate.toString())?.reservationLimit;
    if (customLimitForDay !== undefined) {
      limit = customLimitForDay;
    }
    
    for (let index = 0; index < reservations.length; index++) {
      

      if (reservations[index]?.date.toString() === formattedDate.toString()
       && serviceId.toString() === reservations[index].serviceId.toString())
        reservationsMade = reservationsMade + 1;
      
    }
    if(reservationsMade.toString() === limit.toString())
      dayIsFull = true;

      console.log(formattedDate, dayIsFull);

    let PastDayNotFull = false;
    const currentDate = new Date();
    if ( date.getTime() < currentDate.getTime())
      PastDayNotFull = true;


    return (
      <CustomClientPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsFull = {dayIsFull}
        PastDayNotFull = {PastDayNotFull}
      />
    );
  };

  function handleClose() {
    setShowModal(false);
  }

  function handleConfirm(serviceId) {
    history.push('/login');
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const verifyLogInForAppointment = () => {
    if(loggedIn) {
      history.push(`/service/${serviceId}/appoint`);
    } else {
      handleOpenModal();
    }
  }

   
  return (
  <>
    <AfPage 
      title='Auto Focus repair service'
      buttonText='Make an appointment'
      buttonClick={verifyLogInForAppointment}
      icon={faHome}
    >
      <div className="page-content" >
        <div className="location-title" >
          {composeLocation(currentService.address, currentService.city)}
        </div>
        <div className="maps"></div>
       <Maps coords={{lat: Number(currentService.lat), lng: Number(currentService.lng) }} />
       <div className="view-limit-wrapper-2">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                label="Week picker"
                value={selectedDate}
                onChange={onChangeSlot}
                renderDay={renderWeekPickerDay}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="'Week of' MMM d"
                shouldDisableDate={disableWeekends}
              />
              
            </LocalizationProvider>

        </div> 
       <AfModal 
          show={showModal}
          title="You need to be logged in"
          text="Login so you can make an appointment to our services"
          onClose={handleClose}
          onSave={handleConfirm}
          onSaveText="Login"
       />
      </div>
    </AfPage>
  </>
  )
}

export default ServiceDetails;
