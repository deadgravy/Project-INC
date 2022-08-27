import { useState } from 'react';
import '../styles/profile.css';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {

  }

  return (
    <div className='profileContainer'>
      <div className='profile w-100p px-20 row'>
        <div className='card col-12 p-4 px-16'>
          <h3 className='mb-2' style={{textAlign: 'center'}}>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
