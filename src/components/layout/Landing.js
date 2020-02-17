import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuth }) => {
  if (isAuth) {
    return <Redirect to='/hub/gallery/main' />;
  }

  return (
    <Fragment>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large' style={{ fontFamily: 'Arimo' }}>
              ברוכים הבאים למנהל התמונות
            </h1>
            <div className='buttons'>
              <Link to='/hub/gallery/main' className='btn btn-jb'>
                לתמונות
              </Link>
              <Link to='/hub/gallery/login' className='btn btn-jb'>
                התחברות
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuth: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(Landing);
