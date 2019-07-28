import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-image-gallery/styles/css/image-gallery.css';
import UploadForm from './UploadForm';

// import Experience from './Experience';
// import Education from './Education';

const Dashboard = ({ auth: { user } }) => {
  return (
    <Fragment>
      <h1 className='large text-dark'>העלאת תמונות</h1>
      {/* <p className='lead'>
        <i className='fas fa-user'> ברוך הבא {user && user.name}</i>
      </p> */}

      <Fragment>
        <UploadForm />{' '}
      </Fragment>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
