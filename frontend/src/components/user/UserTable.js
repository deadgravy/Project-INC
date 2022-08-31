import React from 'react';
import { useNavigate } from 'react-router-dom';

export function UserTable(users) {
  let usersArr = users.data;
  let navigate = useNavigate();

  function handleAddUser() {
    navigate('/addUser');
  }

  function deleteUser(userID) {
    let confirmText = 'Are you sure you want to delete this user?';
    if (window.confirm(confirmText)) {
      fetch(`http://localhost:4000/api/deleteUserByID/${userID}`, {
        method: 'DELETE',
      }).then((response) => {
        response.json().then((result) => {
          alert(result.status);
          window.location.reload();
        });
      });
    }
  }
  return (
    <>
      <table className='user-tb table bordered mt-3'>
        <thead>
          <tr>
            <th className='tb-head-nw'>
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
              <abbr title='Title5'>Role</abbr>
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
            <tr className='row-id'>
              <th>{data.user_id}</th>
              <td>
                {data.first_name} {data.last_name}
              </td>
              <td>{data.contact_number}</td>
              <td>{data.email}</td>
              <td>{data.role}</td>
              <td>
                <button
                  className='delete-user-btn btn-primary'
                  id={data.first_name}
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
