import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
// import CreateProfile from '../profile-form/CreateProfile';
// import EditProfile from '../profile-form/EditProfile';
// import AddExperience from '../profile-form/AddExperience';
// import AddEducation from '../profile-form/AddEducation';
// import Profiles from '../profiles/Profiles';
// import Profile from '../profile/Profile';
import Main from '../main/Main';
// import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';
import NewLogin from '../auth/NewLogin';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        {/* <Route exact path='/login' component={Login} /> */}
        <Route exact path='/login' component={NewLogin} />
        <Route exact path='/main' component={Main} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        {/*
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} /> */}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
