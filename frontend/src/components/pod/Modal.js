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
            <form
              action={`http://localhost:3000/productionOverview/53`}
              method='get'
            >
              {data1.data.map((item, count) => {
                return (
                  <div class='form-ext-control form-ext-radio'>
                    <input
                      id={data1.data[count].name}
                      name={data1.data[count].fr_recipe_id}
                      class='form-ext-input'
                      type='radio'
                    />
                    <label class='form-ext-label' for={data1.data[count].name}>
                      {data1.data[count].name}
                    </label>
                  </div>
                );
              })}

              <button class='btn-info btn--pilled' type='submit'>
                Test
              </button>
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
