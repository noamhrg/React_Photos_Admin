import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/actions/auth';
import jbryce from '../../img/jbryce.jpg';
import SearchAppBar from './SearchAppBar';

import { getLatestPosts } from '../../redux/actions/image';

const Navbar = ({
  image: { hashtags, categories },
  auth: { isAuth, loading },
  logout,
  history,
  getLatestPosts
}) => {
  hashtags = hashtags.map(tag => ({
    value: tag.name,
    label: tag.name
  }));

  let isLogo = history.location.pathname == '/main' ? false : true;

  const authLinks = (
    <ul>
      <li>
        <Link to='/hub/gallery/main'>
          <i className='fab fa-instagram' />
          <span className='hide-sm'> גלריה </span>
        </Link>
      </li>
      <li>
        <Link to='/hub/gallery/dashboard'>
          <i className='fas fa-user' />
          <span className='hide-sm'> העלאת תמונות </span>
        </Link>
      </li>
      <li>
        <Link to='/hub/gallery' onClick={logout}>
          <i className='fas fa-sign-out-alt' />
          <span className='hide-sm'> התנתקות </span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/hub/gallery/main'>
          <i className='fab fa-instagram' />
          <span className='hide-sm'> תמונות </span>
        </Link>
      </li>
      <li>
        <Link to='/hub/gallery/login'>
          <i className='fas fa-sign-in-alt' />
          <span className='hide-sm'> חיבור </span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-jb'>
      <h1>
        <Link to='/hub/gallery'>מנהל תמונות</Link>
      </h1>

      {!isLogo ? (
        <SearchAppBar categories={categories} hashtags={hashtags} />
      ) : null}

      {isLogo && <img className='logo' src={jbryce} alt='' />}

      {!loading && <Fragment> {isAuth ? authLinks : guestLinks} </Fragment>}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  getLatestPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  image: state.image
});

export default withRouter(
  connect(mapStateToProps, { logout, getLatestPosts })(Navbar)
);
