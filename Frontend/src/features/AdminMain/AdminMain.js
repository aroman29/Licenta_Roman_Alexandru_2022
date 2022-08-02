import React, { useEffect } from 'react';
import Topbar from '../../components/TopBar/TopBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Dashboard from '../Dashboard/Dashboard';
import Services from '../Services/Services';
import { useDispatch, useSelector } from 'react-redux';
import { MESSAGES } from '../../utils/constants';
import { getAdminMainData } from '../../redux/actions/userActions';
import Cars from '../Cars/Cars';
import Chat from '../Chat/Chat';
import Register from '../Register/Register';
import AddService from '../AddService/AddService'
import { composeName } from '../../utils/utils';
import ProtectedAdminRoute from '../../components/ProtectedRoute/ProtectedAdminRoute';
import {
  Route,
  Switch
} from 'react-router-dom';
import AddCarRepais from '../AddCarRepair/AddCarRepair';
import './style.scss';
import MessageActions from '../../redux/actions/MessageActions';

const AdminMain = () => {

  const userInfo = useSelector((state) => state.user.currentUser);
  const userLoggedIn = useSelector((state) => state.login.loggedIn);
  const receiverUserId = useSelector((state) => state.message.partnerId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userLoggedIn) {
      dispatch(getAdminMainData());
      console.log("got admin main data");
    }
  });

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
      <Sidebar title={composeName(userInfo.lastName, userInfo.firstName)} />

      <div className='content'>
        <Switch>
          {/* ** ADMIN ** */}
          <ProtectedAdminRoute path="/admin/dashboard" component={Dashboard} />
          <ProtectedAdminRoute path="/admin/services" component={Services} />
          <ProtectedAdminRoute path="/admin/cars" component={Cars} />
          <ProtectedAdminRoute path="/admin/Chat" component={Chat} />
          <ProtectedAdminRoute path="/admin/addCarjobs/:carId" component={AddCarRepais} />
          <ProtectedAdminRoute path="/admin/addService" component={AddService} />
          <ProtectedAdminRoute path="/admin/editService/:serviceId" component={AddService} />
          <ProtectedAdminRoute path="/admin/register/:serviceId" component={Register} />
        </Switch>
      </div>
    </div>
  </div>
  );
}

export default AdminMain;