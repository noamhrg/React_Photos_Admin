import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';

// CSS
import './authCSS/main.css';
import './authCSS/util.css';

import loginBackground from '../../img/bg-01.jpg';

const NewLogin = ({ login, isAuth }) => {
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
    return <Redirect to='/hub/gallery/main' />;
  }

  return (
    <Fragment>
      {/* <h1 className='large text-primary'>התחבר</h1> */}

      <div className='limiter'>
        <p className='lead' style={{ textAlign: 'center' }}>
          <i className='fas fa-user' /> התחברות מנהל
        </p>
        <div className='container-login100'>
          <div className='wrap-login100'>
            <div
              className='login100-form-title'
              style={{ backgroundImage: `url(${loginBackground})` }}
            >
              <span className='login100-form-title-1'>התחברות</span>
            </div>

            <form
              className='login100-form validate-form'
              onSubmit={e => {
                onSubmit(e);
              }}
            >
              <div
                className='wrap-input100 validate-input m-b-26'
                data-validate='הכנס שם משתמש'
              >
                <span className='label-input100'>שם משתמש</span>
                <input
                  className='input100'
                  type='email'
                  name='email'
                  value={email}
                  placeholder='כתובת אימייל'
                  onChange={e => onChange(e)}
                  required
                />
                <span className='focus-input100' />
              </div>

              <div
                className='wrap-input100 validate-input m-b-18'
                data-validate='הכנס סיסמה'
              >
                <span className='label-input100'>סיסמה</span>
                <input
                  className='input100'
                  type='password'
                  name='password'
                  placeholder='הכנס סיסמה'
                  minLength='6'
                  value={password}
                  onChange={e => onChange(e)}
                  required
                />
                <span className='focus-input100' />
              </div>

              <div className='container-login100-form-btn'>
                <button className='login100-form-btn'>התחבר</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

NewLogin.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, { login })(NewLogin);
