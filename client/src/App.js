import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Board from './components/pages/Board';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlertState>
        {' '}
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Board} />
            <Route exact path='/about' component={About} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </Router>
      </AlertState>
    </AuthState>
  );
};

export default App;
