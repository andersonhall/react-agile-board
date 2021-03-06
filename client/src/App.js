import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Board from './components/pages/Board';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import ItemState from './context/item/ItemState';
import ColumnState from './context/column/ColumnState';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ColumnState>
        <AlertState>
          <ItemState>
            <Router>
              <Fragment>
                <Navbar />
                <Switch>
                  <PrivateRoute exact path='/' component={Board} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </Fragment>
            </Router>
          </ItemState>
        </AlertState>
      </ColumnState>
    </AuthState>
  );
};

export default App;
