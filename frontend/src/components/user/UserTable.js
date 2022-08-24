import React from 'react';
import { useNavigate } from 'react-router-dom';

export function UserTable(users) {
  let usersArr = users.data;
  let navigate = useNavigate();

  function handleAddUser() {
    navigate('/addUser');
  }

  function deleteUser(userID) {
    console.log(userID);
  }
  return (
    <>
      <table className='table bordered mt-3'>
        <thead>
          <tr>
            <th>
              <abbr title='Title1'>User ID</abbr>
            </th>
            <th>
              <abbr title='Title2'>User Name</abbr>
            </th>
            <th>
              <abbr title='Title3'>Contact</abbr>
            </th>
            <th>
              <abbr title='Title4'>Email</abbr>
            </th>
            <th>
              <button className='btn-link' onClick={handleAddUser}>
                ADD USER
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {usersArr.data.map((data) => (
            <tr>
              <th>{data.user_id}</th>
              <td>
                {data.first_name} {data.last_name}
              </td>
              <td>{data.contact_number}</td>
              <td>{data.email}</td>
              <td>
                <button
                  className='btn-primary'
                  onClick={() => deleteUser(data.user_id)}
                >
                  DELETE USER
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
