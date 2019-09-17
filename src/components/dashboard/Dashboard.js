import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-image-gallery/styles/css/image-gallery.css';
import UploadForm from './UploadForm';

const Dashboard = ({ auth: { user } }, props) => {
  console.log('inside dashboard.js , props are: ', props);

  return (
    <Fragment>
      <h1 className='large text-dark'>העלאת תמונות</h1>

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
