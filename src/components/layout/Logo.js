import React from 'react';
import logo from '../../img/jbryce.jpg';

const Logo = props => {
  return (
    <div className='logo-container'>
      <img src={logo} alt='John Bryce Logo' className='logo' />
    </div>
  );
};

export default Logo;
