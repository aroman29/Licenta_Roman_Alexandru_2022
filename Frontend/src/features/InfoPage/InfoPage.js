import React from 'react';
import AfPage from '../../components/Page/Page';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import infoPage from '../../infoPageSs.png';

import './style.scss';

const InfoPage = () => {

 return (
  <AfPage
  title='Book an Autofocus appointment'
  icon={faInfoCircle}
  >
    <div className="subtitle">Book an appointment before comning to one of our services.</div>
    <div className='title-line'></div>
    <div className='page-content'>
      <div className="info-card">
        <div className='card-content'>
          <div className="card-icon">
          <CarCrashIcon />
          </div>
          <div>
            <div>
              Your car problems are our specialty!
            </div>
            <div>
              We have services spread all around the country to help you keep your car in check.
            </div>
          </div>  
        </div>
              
      </div>
      <div className="info-card">
        <div className='card-content'>
          <div className="card-icon">
          <CarCrashIcon />
          </div>
          <div>
            <div>
              Al you to is select a service and make your appointment!
            </div>
            <div>
              You tell us our problems and we will find a solution for you. You can communicate with us anytime after the appointment.
            </div>
          </div>  
        </div>
              
      </div>
      <div className="info-card">
        <img src={infoPage} className="page-wallpaper" alt="Autofocus.jpeg" />
      </div>
    </div>
  </AfPage>
  );
}

export default InfoPage;