import React, { useState } from 'react';
import '../pod/styles/model.css';

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

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
            <div class='form-ext-control form-ext-radio'>
              <input
                id='radio-1a'
                name='customRadio1'
                class='form-ext-input'
                type='radio'
              />
              <label class='form-ext-label' for='radio-1a'>
                Unselected
              </label>
            </div>
            <div class='form-ext-control form-ext-radio'>
              <input
                id='radio-2a'
                name='customRadio1'
                class='form-ext-input'
                type='radio'
                checked
              />
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
            </div>
            <button className='close-modal' onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
