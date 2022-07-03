import React, { useEffect } from 'react';
import Topbar from '../../components/TopBar/TopBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import InfoPage from '../InfoPage/InfoPage';
import ServicesPage from '../ServicesPage/ServicesPage';
import { useDispatch, useSelector } from 'react-redux';
import { getMainData } from '../../redux/actions/userActions';
import { composeName } from '../../utils/utils';
import MakeApointment from '../MakeAppointment/MakeAppointment'
import Cars from '../Cars/Cars';
import Chat from '../Chat/Chat';
import ServiceDetails from '../ServiceDetails/ServiceDetails';
import MessageActions from '../../redux/actions/MessageActions';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import {
  Route,
  Switch
} from 'react-router-dom';
import './style.scss';


const Main = () => {

  // const userInfo = useSelector((state) => state.user.currentUser);
  // const userLoggedIn = useSelector((state) => state.login.loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMainData());
     console.log("got main data");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(MessageActions.getMessages());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

 return (
  <div class="main">
    <Topbar />
    <div className='sidebar-content'>
      <Sidebar title="Guest" />

      <div className='content'>
        <Switch>
          <Route exact path="/" component={InfoPage} />
          <Route path="/selectService" component={ServicesPage} />
          <ProtectedRoute path="/yourCars" component={Cars} />
          <ProtectedRoute path="/chat" component={Chat} />
          <Route exact path="/service/:serviceId" component={ServiceDetails} />
          <ProtectedRoute path="/service/:serviceId/appoint" component={MakeApointment} />
        </Switch>
      </div>
    </div>
  </div>
  );
}

export default Main;