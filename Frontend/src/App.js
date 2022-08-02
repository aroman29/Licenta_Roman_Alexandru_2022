import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './features/Login/Login';
import Register from './features/Register/Register';
import AdminMain from './features/AdminMain/AdminMain';
import Main from './features/Main/Main';
import ProtectedAdminRoute from './components/ProtectedRoute/ProtectedAdminRoute';
import './App.scss';
import init from './i18n';

init();

function App() {
  return (
    <Router basename='/'>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <ProtectedAdminRoute path="/admin/" component={AdminMain} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
