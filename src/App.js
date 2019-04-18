import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
// import Layout from './hoc/Layout/Layout';
import Main from './containers/Main/Main';
import UserRoutes from './components/UserRoutes/UserRoutes';
import AuthSignUp from './containers/Auth/AuthSignUp';
import AuthSignIn from './containers/Auth/AuthSignIn';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Switch>
            <Route path='/userroutes' component={UserRoutes} />
            <Route path='/login' component={AuthSignIn} />
            <Route path='/signup' component={AuthSignUp} />
            <Route path='/logout' component={Logout} />
            <Route path='/' component={Main} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
