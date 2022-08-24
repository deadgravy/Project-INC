import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/unauthorized.css';

const Unauthorized = () => {
  let navigate = useNavigate();

  function handleClick() {
    navigate('/equipmentUtilisationSnapshot');
  }
  return (
    <div className='Unauthorized row'>
      <div className='col-12 px-4 py-6 u-flex u-justify-center'>
        <img
          src={require('../logos/firc-logo.png')}
          alt=''
          className='firc_logo'
        />
      </div>
      <div className='unauth-display col-12 px-4 py-3 u-flex u-justify-center'>
        <h1>Unauthorized</h1>
      </div>
      <p className='col-12 u-flex u-justify-center u-text-center'>
        Sorry, but you are not authorized to view this page!
      </p>
      <p className='col-12 u-flex u-justify-center u-text-center'>
        Please contact the system admin if you think this is a mistake.
      </p>
      <div className='row'>
        <button className='col-2 offset-5 btn-info' onClick={handleClick}>
          Back to home
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
