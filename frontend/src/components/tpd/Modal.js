import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import '../tpd/styles/modal.css';

export default function Modal({ data }) {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setModal(!modal);
  };

  // if (modal) {
  //   document.body.classList.add('active-modal');
  // } else {
  //   document.body.classList.remove('active-modal');
  // }
  // const navigateToContacts = () => {
  //   // 👇️ navigate to /contacts
  //   navigate('/todaysProduction', { replace: true });
  // };
  return (
    <>
      <button onClick={toggleModal} className='btn-modal'>
        All Products
      </button>

      {modal && (
        <div className=''>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modal-content'>
            <form
              action={`http://localhost:3000/todaysProduction`}
              method='get'
            >
              {data.data.map((item, count) => {
                return (
                  <div class='form-ext-control form-ext-radio'>
                    <input
                      id={data.data[count].name}
                      name={data.data[count].batchestocomplete}
                      class='form-ext-input'
                      type='radio'
                    />
                    <label class='form-ext-label' for={data.data[count].name}>
                      {data.data[count].name}
                    </label>
                  </div>
                );
              })}

              <button class='btn-info btn--pilled' type='submit'>
                Submit
              </button>
            </form>

            <button className='close-modal' onClick={toggleModal}>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
