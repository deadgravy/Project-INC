import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../pod/styles/model.css';

export default function Modal({ data1 }) {
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
  const navigateToContacts = () => {
    // 👇️ navigate to /contacts
    navigate('/productionOverview/55', { replace: true });
  };
  return (
    <>
      <button onClick={toggleModal} className='btn-modal'>
        Open
      </button>

      {modal && (
        <div className=''>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modal-content'>
            <h2>Hello Modal</h2>
            {data1.data.map((item, count) => {
              return (
                <div class='form-ext-control form-ext-radio'>
                  <input
                    id={data1.data[count].name}
                    name='customRadio1'
                    class='form-ext-input'
                    type='radio'
                  />
                  <label class='form-ext-label' for={data1.data[count].name}>
                    {data1.data[count].name}
                  </label>
                </div>
              );
            })}
            {/* <div class='form-ext-control form-ext-radio'>
              <input
                id='radio-2a'
                name='customRadio1'
                class='form-ext-input'
                type='radio'
                checked
              /> te
              <label class='form-ext-label' for='radio-2a'>
                Selected
              </label>
            </div>
            <div class='form-ext-control form-ext-radio'>
              <input
                id='radio-3a'
                name='customRadio1'
                class='form-ext-input'
                type='radio'
              />
              <label class='form-ext-label' for='radio-3a'>
                Unselected
              </label>
            </div> */}
            <form method='GET' action='63'>
              <button class='btn-info btn--pilled'>Test</button>
            </form>

            <button className='close-modal' onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
