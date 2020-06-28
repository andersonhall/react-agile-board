import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Board from './components/pages/Board';
import About from './components/pages/About';

import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Board} />
        <Route exact path='/about' component={About} />
      </Switch>
    </Router>
  );
};

export default App;
