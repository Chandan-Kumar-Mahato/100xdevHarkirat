import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;