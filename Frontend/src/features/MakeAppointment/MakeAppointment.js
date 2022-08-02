import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams,useRouteMatch } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { BUTTON_TYPES } from '../../utils/constants';
import RbInput from '../../components/Input/Input';
import RbPage from '../../components/Page/Page';
import RbButton from '../../components/Button/Button';
import Collapsable from '../../components/Collapsable/Collapsable';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import oilChangeImage2 from '../../oilChange2.png';
import tireChangeImage2 from '../../tireChange2.png';
import wheelAlignmentImage from '../../wheelAlignment.png';
import checkBreakesImage from '../../changeBreakes.png';
import airConditioningImage from '../../airConditioning.png';
import carCheckImage from '../../carCheck.png';
import Grid from "@mui/material/Grid";
import serviceActions from '../../redux/actions/ServiceActions';
import './style.scss';
import AfButton from '../../components/Button/Button';
import reservationActions from '../../redux/actions/reservationActions';
import AfDropdown from '../../components/Dropdown/Dropdown';
import { CustomClientPickersDay } from '../../utils/muiStyles';
import moment from 'moment';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';

const MakeAppointment = () => {

  const { t: translate } = useTranslation();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const { serviceId } = useParams();
  const [options, setOptions] = useState({
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    }
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateError, setSelectedDateError] = useState(false);
  const reservations = useSelector((state) => state.reservation.cars)
    .filter((res) => res.serviceId === serviceId.toString());
  const selectedService = useSelector((state) => state.service.services.find(
    (service) => service.id.toString() === serviceId,
  ));
  const currentUser = useSelector((state) => state.user.currentUser);
  const [customReservationLimitsInservice, setCustomReservationLimitsInservice] = useState([]);


  const mockDate = ({
    0: "2022-06-01",
    1: "2022-06-11",
    2: "2022-06-12",
    3: "2022-06-29",

  })

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  function isWorkDay(date, month, year) {
    const weekDay = new Date(year, month, date).getDay()
    return  weekDay !== 0 && weekDay !== 6; 
  }

  useEffect(() => {
    // dispatch(reservationActions.getReservations());
    const currentdate = new Date();
    const currentFormattedDate =  moment(currentdate).format('YYYY-MM-DD');
    
    let monthOverflow = true;


    for (let index = 0; index < getDaysInMonth(currentdate.getFullYear(), currentdate.getMonth()); index++) {

      const dateInLoop = new Date(currentdate.getFullYear(), currentdate.getMonth(), index);
      const loopFormattedDay =  moment(dateInLoop).format('YYYY-MM-DD');
      if(index > currentdate.getDate() && isWorkDay(index, currentdate.getMonth(), currentdate.getFullYear())){

        let selected = true;
        for (let index = 0; index < reservations.length; index++) {
          const element = reservations[index].date;
          if (element === loopFormattedDay)
            selected = false;
          
        }       

        if(selected){
          setSelectedDate(loopFormattedDay);
          monthOverflow = false;
          break;
        };
      }      
    }

    if (monthOverflow) { 

      for (let index = 0; index < getDaysInMonth(currentdate.getFullYear(), currentdate.getMonth() + 1); index++) {
        const dateInLoop = new Date(currentdate.getFullYear(), currentdate.getMonth() + 1, index);
        const loopFormattedDay =  moment(dateInLoop).format('YYYY-MM-DD');
        
        if(index >= currentdate.getDate()){

          let selected = true;
          for (let index = 0; index < reservations.length; index++) {
            const element = reservations[index].date;
            if (element === loopFormattedDay)
              selected = false;
            
          }

          if(selected){
            setSelectedDate(loopFormattedDay);
            monthOverflow = false;
            break;
          };
        }     
      }
    }

    dispatch(serviceActions.getCustomServieLimits(serviceId))
      .then((res) => {
        setCustomReservationLimitsInservice(res);
      });

  }, []);

  const onChangeSlot = (newValue) => {
    
    const formattedDate =  moment(newValue).format('YYYY-MM-DD');
    setSelectedDate(newValue);
    let dayIsFull = false;
    let reservationsMade = 0;

    var limit  = selectedService?.reservationLimit;



    // for (let index = 0; index < reservations.length; index++) {

    //   const element = reservations[index].date;
    //   if (element === formattedDate){
    //     dayIsFull = true;
    //   }
      
    // }
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

    if (dayIsFull){
      setSelectedDateError(true);
    } else {
      setSelectedDateError(false);
    }
      
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

  function disableWeekends(date) {
    const currentDate = new Date();
    const pastDates = currentDate.getTime() > date.getTime();
    const farDates = currentDate.getTime() + 2629800000 < date.getTime();
    return date.getDay() === 0 || date.getDay() === 6 || pastDates || farDates;
  }

  const onSubmit = (data) => {

    if(!selectedDateError) {

      console.log("submit", data);
      const apiData = {
        ...data,
        date: moment(selectedDate).format('YYYY-MM-DD'),
        option0: options[0],
        option1: options[1],
        option2: options[2],
        option3: options[3],
        option4: options[4],
        option5: options[5],
        user: currentUser,
        service: selectedService,
        userId: currentUser.id,
        serviceId: selectedService.id,

      };
      dispatch(reservationActions.addReservation(apiData))
      .then((res) => {
        history.push(`/service/${serviceId}`);
      });
      // console.log(apiData);
      
    }

  };

  const addOption = (event) => {
    setOptions((prevState) => ({
      ...prevState,
      [event.target.id]: !options[event.target.id],
    }));
  };

  const combustibleValues = [{
    label: "Gasoline",
    value: 0,
  },
  {
    label: "Diesel",
    value: 1,
  }

  ];


  const markValidationRules = {
    required: {
      value: true,
      message: translate('CAR.makeAppointment.markRequired'),
    },
  };

  const modelValidationRules = {
    required: {
      value: true,
      message: translate('CAR.makeAppointment.modelRequired'),
    },
  };

  const generationValidationRules = {
    required: {
      value: true,
      message: translate('CAR.makeAppointment.generationRequired'),
    },
  };

  const fabricationDateValidationRules = {
    required: {
      value: true,
      message: translate('CAR.makeAppointment.fabricationDateRequired'),
    },
  };

  const combustibleValidationRules = {
    required: {
      value: true,
      message: translate('CAR.makeAppointment.combustibleRequired'),
    },
  };

  const reservationDateValidationRules = {
    required: {
      value: true,
      message: translate('CAR.makeAppointment.dateRequired'),
    },
  };

  const reservationHourValidationRules = {
    required: {
      value: true,
      message: translate('CAR.makeAppointment.hourRequired'),
    },
  };


  return (
    <RbPage
      title={translate('APPOINTMENT.buttonTitleText')}
      icon={faBuilding}
      buttonClick={() => {}}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="make-appointment-wrapper">

            <div className="form-inputs">

              <Collapsable 
                buttonText="What do we need to fix?"
                defaultDisplay={false}
              >
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {/* 1 */}
                  <Grid item xs={4}>
                    <Card sx={{ maxWidth: 300, height: 450 }}>
                      <CardMedia
                        component="img"
                        height="130"
                        image={oilChangeImage2}
                        alt="Oil Change"
                      />
                      <CardContent sx={{height: 200}}>
                        <Typography gutterBottom variant="h5" component="div">
                          Oil Change
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Choose this option if you know your oil is expirad or needs to be changed
                        </Typography>
                      </CardContent>
                      <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                        <AfButton 
                          id='0' 
                          small 
                          text={!options[0] ? "Add" : "Remove"} 
                          buttonType={!options[0] ? BUTTON_TYPES.add : BUTTON_TYPES.remove}
                          onClick={addOption}  
                        />
                        {/* <AfButton id='0' small text="Show Pricing" buttonType={BUTTON_TYPES.green}/> */}
                      </CardActions>
                    </Card>
                  </Grid>

                  {/* 2 */}
                  <Grid item xs={4}>
                    <Card sx={{ maxWidth: 300, height: 450 }}>
                      <CardMedia
                        component="img"
                        height="130"
                        image={tireChangeImage2}
                        alt="Tire Change"
                      />
                      <CardContent sx={{height: 200}}>
                        <Typography gutterBottom variant="h5" component="div">
                          Tire Change
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Choose this option if you want to change tires or even check if they are still good for use
                        </Typography>
                      </CardContent>
                      <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                        <AfButton id='1' 
                          small 
                          text={!options[1] ? "Add" : "Remove"} 
                          buttonType={!options[1] ? BUTTON_TYPES.add : BUTTON_TYPES.remove}
                          onClick={addOption}   
                        />
                        {/* <AfButton id='1' small text="Show Pricing" buttonType={BUTTON_TYPES.green}
                        onClick={addOption}
                        /> */}
                      </CardActions>
                    </Card>
                  </Grid>

                  {/* 3 */}
                  <Grid item xs={4}>
                    <Card sx={{ maxWidth: 300, height: 450 }}>
                      <CardMedia
                        component="img"
                        height="130"
                        image={wheelAlignmentImage}
                        alt="Wheel Alignment"
                      />
                      <div className="card-aligned">
                        <CardContent sx={{height: 200}}>
                          <Typography gutterBottom variant="h5" component="div">
                            Wheel Alignment
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Choose this option if notice:
                            Your steering wheel isn't centered. ...
                            Your vehicle pulls to one side or the other. ...
                            You notice abnormal tire wear in certain spots. ...
                            The handling feels loose. ...
                            The steering wheel doesn't return to center.
                          </Typography>
                        </CardContent>
                      
                        <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                          <AfButton id='2'
                            small 
                            text={!options[2] ? "Add" : "Remove"} 
                            buttonType={!options[2] ? BUTTON_TYPES.add : BUTTON_TYPES.remove}
                            onClick={addOption}
                          />
                          {/* <AfButton id='2' small text="Show Pricing" buttonType={BUTTON_TYPES.green}/> */}
                        </CardActions>
                      </div>

                     
                    </Card>
                  </Grid>

                  {/* 4 */}
                  <Grid item xs={4}>
                    <Card sx={{ maxWidth: 300, height: 450 }}>
                      <CardMedia
                        component="img"
                        height="130"
                        image={checkBreakesImage}
                        alt="Change Breaks"
                      />
                      <CardContent sx={{height: 200}}>
                        <Typography gutterBottom variant="h5" component="div">
                          Change Breaks
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Choose this option if you want to change your breaks or you need us to check them
                        </Typography>
                      </CardContent>
                      <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                        <AfButton 
                          id='3'
                          small 
                          text={!options[3] ? "Add" : "Remove"} 
                          buttonType={!options[3] ? BUTTON_TYPES.add : BUTTON_TYPES.remove}
                          onClick={addOption}
                        />
                        {/* <AfButton id='3' small text="Show Pricing" buttonType={BUTTON_TYPES.green}/> */}
                      </CardActions>
                    </Card>
                  </Grid>

                  {/* 5 */}
                  <Grid item xs={4}>
                    <Card sx={{ maxWidth: 300, height: 450 }}>
                      <CardMedia
                        component="img"
                        height="130"
                        image={airConditioningImage}
                        alt="Air Conditioning Problems"
                      />
                      <CardContent sx={{height: 200}}>
                        <Typography gutterBottom variant="h5" component="div">
                          Air Conditioning Problems 
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Choose this option if you have problems with your air conditioning.
                        </Typography>
                      </CardContent>
                      <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                        <AfButton 
                          id='4'
                          small 
                          text={!options[4] ? "Add" : "Remove"} 
                          buttonType={!options[4] ? BUTTON_TYPES.add : BUTTON_TYPES.remove}
                          onClick={addOption}
                        />

                        {/* <AfButton id='4' small text="Show Pricing" buttonType={BUTTON_TYPES.green}/> */}
                      </CardActions>
                    </Card>
                  </Grid>

                  {/* 6 */}
                  <Grid item xs={4}>
                    <Card sx={{ maxWidth: 300, height: 450 }}>
                      <CardMedia
                        component="img"
                        height="130"
                        image={carCheckImage}
                        alt="Car Check Image"
                      />
                      <CardContent sx={{height: 200}}>
                        <Typography gutterBottom variant="h5" component="div">
                          Let us check your car 
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Choose this option if you:
                          Want a routing check of your car
                          You have a problem and dont know what is wrong
                          You have other problems
                        </Typography>
                      </CardContent>
                      <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                        <AfButton 
                          id='5'
                          small 
                          text={!options[5] ? "Add" : "Remove"} 
                          buttonType={!options[5] ? BUTTON_TYPES.add : BUTTON_TYPES.remove}
                          onClick={addOption}
                        />

                        {/* <AfButton id='5' small text="Show Pricing" buttonType={BUTTON_TYPES.green}/> */}
                      </CardActions>
                    </Card>
                  </Grid>

                </Grid>

                <div className='notes-section'>
                  <div className='notes-title'>Notes:</div>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={5}
                    placeholder="Explain what problems you have with your car..."
                    style={{ width: 400 }}
                    {...register('notes')}
                  />
                </div>

              </Collapsable>

              <Collapsable 
                buttonText="Choose a date"
                defaultDisplay={false}
              >

                <div className="date-picker-container">
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
                <div className="input-error-msg">{selectedDateError ? translate('DASHBOARD.dayIsFullForReservation') : ''}</div>
                </div>
                
              </Collapsable>


              <Collapsable 
                buttonText="What car do you drive?"
                defaultDisplay={false}
              >
                  <RbInput
                    small
                    label={translate('CAR.mark')}
                    errorMessage={errors.mark && errors.mark.message}
                    labelIcon={faCar}
                    placeholder='type here..'
                    {...register('mark', markValidationRules)}
                  />
                  <RbInput
                    small
                    label={translate('CAR.model')}
                    errorMessage={errors.model && errors.model.message}
                    labelIcon={faCar}
                    placeholder='type here..'
                    {...register('model', modelValidationRules)}
                  />
                  <RbInput
                    small
                    label={translate('CAR.generation')}
                    errorMessage={errors.generation && errors.generation.message}
                    labelIcon={faCar}
                    placeholder='type here..'
                    {...register('generation', generationValidationRules)}
                  />
                  <RbInput
                    small
                    label={translate('CAR.fabricationDate')}
                    errorMessage={errors.fabricationDate && errors.fabricationDate.message}
                    labelIcon={faCar}
                    placeholder='type here..'
                    {...register('fabricationDate', fabricationDateValidationRules)}
                  />
                  <AfDropdown 
                    small
                    label={translate('CAR.combustible')}
                    errorMessage={errors.combustible && errors.combustible.message}
                    labelIcon={faCar}
                    values={combustibleValues}
                    placeholder='type here..'
                    {...register('combustible', combustibleValidationRules)}
                  />

              </Collapsable>

              

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

export default MakeAppointment;
