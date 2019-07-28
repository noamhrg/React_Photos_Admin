import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';

const Login = ({ login, isAuth }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuth) {
    return <Redirect to='/main' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>התחבר</h1>
      <p className='lead'>
        <i className='fas fa-user' /> התחברות מנהל
      </p>
      <form
        className='form'
        onSubmit={e => {
          onSubmit(e);
        }}
      >
        <div className='form-group'>
          <input
            type='email'
            placeholder='כתובת אימייל'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='סיסמה'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <input type='submit' className='btn btn-primary' value='התחבר' />
      </form>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
