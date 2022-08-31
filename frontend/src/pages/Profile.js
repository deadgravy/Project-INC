import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

const Profile = () => {
  const [email, setEmail] = useState(localStorage.getItem('user'));
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
  const [lastName, setLastName] = useState(localStorage.getItem('lastName'));
  const [phone, setPhone] = useState(localStorage.getItem('phone'));

  let userID = localStorage.getItem('userID');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      firstName,
      lastName,
      phone,
    };

    fetch(`http://localhost:4000/api/updateUserByID/${userID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        alert('Update Successful');
        localStorage.setItem('user', email);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('phone', phone);
      } else {
        console.log(response);
        if (!response?.status) {
          alert('No server response');
        } else if (response?.status === 400) {
          alert('Missing fields');
        } else {
          alert('Update failed!');
        }
      }
    });
  };

  return (
    <div className='profileContainer'>
      <div className='profile w-100p px-20 row'>
        <div className='card col-12 p-4 px-16'>
          <h3 className='mb-2' style={{ textAlign: 'center' }}>
            Profile
          </h3>
          <form onSubmit={handleSubmit}>
            <h6 className='ml-1 mb-0 mt-2'>First Name</h6>
            <div className='row level'>
              <div className='col-xs-12 level-item'>
                <input
                  type='name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <h6 className='ml-1 mb-0 mt-2'>Last Name</h6>
            <div className='row level'>
              <div className='col-xs-12 level-item'>
                <input
                  type='name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <h6 className='ml-1 mb-0 mt-2'>Email</h6>
            <div className='row level'>
              <div className='col-xs-12 level-item'>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <h6 className='ml-1 mb-0 mt-2'>Telephone Number</h6>
            <div className='row level'>
              <div className='col-xs-12 level-item'>
                <input
                  type='tel'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <button className='u-pull-right mr-1 mt-2 bg-info text-white'>
              Update Details
            </button>
            <div className='mt-3'>
              <a
                href='/equipmentUtilisationSnapshot'
                className='u u-LR text-white'
              >
                Back to Home
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
