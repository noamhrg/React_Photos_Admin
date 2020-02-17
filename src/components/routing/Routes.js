import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Main from '../main/Main';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import NewLogin from '../auth/NewLogin';

const Routes = props => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/hub/gallery/login' component={NewLogin} />
        <Route exact path='/hub/gallery/main' component={Main} />
        <PrivateRoute
          exact
          path='/hub/gallery/dashboard'
          component={Dashboard}
        />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
