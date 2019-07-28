// React & Router
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';
import {
  getLatestPosts,
  getCategories,
  getHashtags
} from './redux/actions/image';
// Components
import Routes from './components/routing/Routes';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import ScrollToTop from './components/layout/ScrollToTop';
import Footer from './components/layout/Footer';
// import Alert from './components/layout/Alert';
// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';

// Utils
import setAuthToken from './utils/setAuthToken';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    // let appState = store.getState();
    // console.log('getting posts');
    store.dispatch(loadUser());
    // store.dispatch(getLatestPosts('0'));
    store.dispatch(getCategories());
    store.dispatch(getHashtags());
  }, []);

  let isMobile = window.matchMedia('(max-width: 1200px)').matches;

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <CssBaseline />
          <Navbar />
          <div className='form-group'>
            <ToastContainer
              className={'toast-container'}
              rtl
              position={isMobile ? 'top-center' : 'top-right'}
              autoClose={4000}
            />
          </div>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
        <Footer />
        <ScrollToTop />
      </Router>
    </Provider>
  );
};

export default App;
