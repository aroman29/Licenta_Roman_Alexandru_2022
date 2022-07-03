import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BUTTON_TYPES, CAR_SUMMARY_STATUSSES, STATUSSES, PROBLEMS, USER_TYPE } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import carActions from '../../redux/actions/carActions';
import AfButton from '../Button/Button';
import AfModal from '../Modal/Modal';
import {
  faEdit, faTimes, faAngleDoubleUp, faAngleDoubleDown, faCheck, faCircleNotch, faExclamation
} from '@fortawesome/free-solid-svg-icons';
import ExtendedSummary from '../ExtendedSummary/ExtendedSummary';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import './style.scss';
import MessageActions from '../../redux/actions/MessageActions';

const CarSummary = ({
  summary
}) => {

  const { t: translate } = useTranslation();
  const [extendedState, setExtendedState] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPickedModal, setShowPickedModal] = useState(false);
  const carProblems = useSelector((state) => state.car?.problems).find((problem) => problem?.carId === summary?.id);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = useState([]);
  const currentUser = useSelector((state) => state.user?.currentUser);
  const users = useSelector((state) => state.user.users);
  const admin = useSelector((state) => state.user.users).filter((user) => user.role.toString() === USER_TYPE.admin.toString());
  const [unseenMessages, setUnseenMessages] = useState([]);

  const messages = useSelector((state) => state.message.messages).filter((message) =>
  (currentUser?.id === message?.senderId || currentUser?.id === message?.receiverId));

  useEffect(() => {
    let options = [];
    if(carProblems?.option0 ) options.push(PROBLEMS.option0);
    if(carProblems?.option1 ) options.push(PROBLEMS.option1);
    if(carProblems?.option2 ) options.push(PROBLEMS.option2);
    if(carProblems?.option3 ) options.push(PROBLEMS.option3);
    if(carProblems?.option4 ) options.push(PROBLEMS.option4);
    if(carProblems?.option5 ) options.push(PROBLEMS.option5);

    setOptions(options);
  }, []);


  useEffect(() => {
  
    const unseen = messages.filter((message) => message.receiverId === currentUser.id
    && message.seen === false && message.senderId === summary.userId);
    setUnseenMessages(unseen);

    const staffWorker = users.find((user) => user?.serviceId === summary?.serviceId);
    const unseenUser = messages.filter((message) => message.receiverId === currentUser.id
    && message.seen === false && message.senderId === staffWorker?.id);
    if(staffWorker !== undefined) {
      setUnseenMessages(unseenUser);
    } else {
      // handleChat(admin?.id);
    }

                        
    console.log(messages, currentUser.id, unseen);
    // unseenMessages.map((message) => dispatch(MessageActions.seenMessage(message.id)));
  }, []);

  const handleClickOpen = () => {
    console.log(carProblems);
    setOpen(true);
  };

  const handleChat = (partnerId) => {

    // const partner = users.find((user) => user.id === partnerId);
    dispatch(MessageActions.addChatPartnerSuccess(partnerId))
    if(currentUser.role === USER_TYPE.client.toString())
      history.push('/chat');
    else history.push('/admin/chat');
  };
  
  const handleCloseD = () => {
    setOpen(false);
  };

  function handleClose() {
    setShowAcceptModal(false);
    setShowStartModal(false);
    setShowFinishModal(false);
    setShowCancelModal(false);
    setShowPickedModal(false);
  }

  function handleAcceptCar() {
    dispatch(carActions.editCarStatus(summary?.id, STATUSSES.IN_SERVICE))
      .then((res) => {
        console.log(res);
      });
      setShowAcceptModal(false);
  };
  function handleStartCar() {
    dispatch(carActions.editCarStatus(summary?.id, STATUSSES.IN_PROGRESS))
      .then((res) => {
        console.log(res);
      });
      setShowStartModal(false);
  };
  function handleFinishCar() {
    dispatch(carActions.editCarStatus(summary?.id, STATUSSES.FINISHED))
      .then((res) => {
        console.log(res);
      });
      setShowFinishModal(false);
  };
  function handleCancelCar() {
    dispatch(carActions.editCarStatus(summary?.id, STATUSSES.PICKED))
      .then((res) => {
        console.log(res);
      });
      setShowCancelModal(false);
  };
  function handlePickedCar() {
    dispatch(carActions.editCarStatus(summary?.id, STATUSSES.PICKED))
      .then((res) => {
        console.log(res);
      });
      setShowPickedModal(false);
  };

  const handleOpenAcceptModal = (serviceIdSelected) => {
    setShowAcceptModal(true);
  };
  const handleOpenStartModal = (serviceIdSelected) => {
    setShowStartModal(true);
  };
  const handleOpenFinishModal = (serviceIdSelected) => {
    setShowFinishModal(true);
  };
  const handleOpenCancelModal = (serviceIdSelected) => {
    setShowCancelModal(true);
  };
  const handleOpenPickedModal = (serviceIdSelected) => {
    setShowPickedModal(true);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  function renderRow(props) {
    const { index, style } = props;
  
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={options[index]} />
        </ListItemButton>
      </ListItem>
    );
  }
  
  return (
    <div className='summary'>
      <div className={`car-summary-container ${CAR_SUMMARY_STATUSSES[summary?.status]}`}>
        <div className='summary-title'>
          {summary?.mark} {summary?.model} {summary?.generation}
        </div>
        <div className='summary-header'>
          <div className='header-data'>
            <div className='data'>
              year: <div>{summary?.fabricationDate}</div>
            </div>
            <div className='data'>
              combustible: <div>{translate(`CAR_SUMMARY.combustible.${summary?.combustible}`)}</div>
            </div>
          </div>

          <div className='header-status-buttons'>
            <div className='status'>
              <div>{translate(`CAR_SUMMARY.status.${summary?.status}`)}</div>
            </div>
            <div className='header-buttons'>
              {(currentUser.role !== USER_TYPE.client.toString()) 
              ? (<div className={`${(summary?.status === STATUSSES.WAITING || 
                summary?.status === STATUSSES.FINISHED) ? 'control-buttons-big' : 'control-buttons'}`}>
                  {summary?.status === STATUSSES.WAITING 
                  ? (<><AfButton 
                    text='Accept'
                    small 
                    buttonType={BUTTON_TYPES.primary}
                    onClick={handleOpenAcceptModal}  
                  />
                  <AfButton 
                    text='Cancel' 
                    small 
                    buttonType={BUTTON_TYPES.remove}
                    onClick={handleOpenCancelModal}  
                  />
                  </>
                  ) : ""
                  }
                  {summary?.status === STATUSSES.IN_SERVICE 
                  ? (<AfButton 
                    text='Start' 
                    small 
                    buttonType={BUTTON_TYPES.primary}
                    onClick={handleOpenStartModal}  
                  />
                  ) : ""
                  }
                  {summary?.status === STATUSSES.IN_PROGRESS 
                  ? (<AfButton 
                    text='Finish' 
                    small 
                    buttonType={BUTTON_TYPES.primary}
                    onClick={handleOpenFinishModal}  
                  />
                  ) : ""
                  }
                  {summary?.status === STATUSSES.FINISHED 
                  ? (<>
                    <AfButton 
                      text='Go Back' 
                      small 
                      buttonType={BUTTON_TYPES.delete}
                      onClick={handleOpenStartModal}  
                    />
                      <AfButton
                      text='Picked'
                      small
                      buttonType={BUTTON_TYPES.primary}
                      onClick={handleOpenPickedModal}  
                    />
                  </>
                  ) : ""
                  }
                  {summary?.status === STATUSSES.CANCELED 
                  ? (<AfButton 
                    text='Start Again' 
                    small 
                    buttonType={BUTTON_TYPES.primary}
                    onClick={handleOpenAcceptModal}  
                  />
                  ) : ""
                  }
                  <AfButton
                    text='Problems'
                    buttonIcon={faExclamation}
                    small 
                    buttonType={BUTTON_TYPES.secondary}
                    onClick={handleClickOpen}  
                  />
                  <AfButton
                      text='Chat'
                      buttonIcon={faComments}
                      small 
                      buttonType={BUTTON_TYPES.add}
                      onClick={() => {
                        // const client = users.find((user) => user?.id === summary?.userId);
                        handleChat(summary?.userId);

                      }}  
                    />
                    {unseenMessages.length > 0 ? <div className='unseen'>({unseenMessages.length})</div> : ""}
                </div>
                ) : (
                <>
                  <div className='control-buttons'>
                    <AfButton
                      text='Observations'
                      // buttonIcon={faExclamation}
                      small 
                      buttonType={BUTTON_TYPES.secondary}
                      onClick={handleClickOpen}  
                    />
                    <AfButton
                      text='Chat'
                      buttonIcon={faComments}
                      small 
                      buttonType={BUTTON_TYPES.add}
                      onClick={() => {
                        const staffWorker = users.find((user) => user?.serviceId === summary?.serviceId);
                        if(staffWorker !== undefined) {
                          handleChat(staffWorker?.id);
                        } else {
                          handleChat(admin?.id);
                        }
                        
                        
                      }}  
                    />
                    {/* {unseenMessages.length > 0 ? <div className='unseen'>(!)</div> : ""} */}
                    {unseenMessages.length > 0 ? <div className='unseen'>({unseenMessages.length})</div> : ""}
                  </div>
                </>
              )
              }
          
              <FontAwesomeIcon
                icon={extendedState ? faAngleDoubleUp : faAngleDoubleDown}
                className="drop-icon"
                onClick={() => setExtendedState(!extendedState)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {extendedState && (summary?.status !== STATUSSES.WAITING && summary?.status !== STATUSSES.IN_SERVICE) ? <ExtendedSummary summary={summary} /> : ''}
      <AfModal show={showAcceptModal} title={translate("MODAL.acceptCarMesage")} onClose={handleClose} onSave={handleAcceptCar} text={translate("MODAL.areYouSureMessage")} />
      <AfModal show={showStartModal} title={translate("MODAL.startCarMesage")} onClose={handleClose} onSave={handleStartCar} text={translate("MODAL.areYouSureMessage")} />
      <AfModal show={showFinishModal} title={translate("MODAL.finishCarMesage")} onClose={handleClose} onSave={handleFinishCar} text={translate("MODAL.areYouSureMessage")} />
      <AfModal show={showCancelModal} title={translate("MODAL.cancelCarMesage")} onClose={handleClose} onSave={handleCancelCar} text={translate("MODAL.areYouSureMessage")} />
      <AfModal show={showPickedModal} title={translate("MODAL.pickedCarMessage")} onClose={handleClose} onSave={handlePickedCar} text={translate("MODAL.areYouSureMessage")} />
      <BootstrapDialog
        onClose={handleCloseD}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseD}>
          {currentUser?.role !== USER_TYPE.client.toString() ? "Details given by client" : "Details given by you"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <div className="evidentiate">Notes:</div> {carProblems?.notes}
          </Typography>
          <Typography gutterBottom>
          <div className="evidentiate">Date:</div> {carProblems?.date}

          </Typography>
          <Typography gutterBottom>

          <div className="evidentiate">Options Selected:</div>
          </Typography>
          
          <Typography gutterBottom>
            {options.length > 0 ? (<FixedSizeList
              height={400}
              width={360}
              itemSize={46}
              itemCount={options.length}
              overscanCount={5}
            >
              {renderRow}
            </FixedSizeList>) : "No options were selected"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseD}>
            Bo Back
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

CarSummary.propTypes = {
  summary: PropTypes.object.isRequired,
};

export default CarSummary;
