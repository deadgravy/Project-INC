import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/sidebar.css';
import { SidebarData } from './SidebarData';
import PeopleIcon from '@mui/icons-material/People';

const Sidebar = () => {
  return (
    <div className='card h-screen p-2'>
      <img src={require('../../logos/firc-logo.png')} alt='' />
      <ul className='p-0 m-0'>
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className='row level px-1'
              style={{ justifyContent: 'left' }}
              id={window.location.pathname === val.link ? 'active' : ''}
            >
              <Link to={val.link}>
                <div className='mt-1'>{val.icon}</div>
                <div className='mx-2'>{val.title}</div>
              </Link>
            </li>
            // <li key={key} className="row level px-1" style={{justifyContent: 'left'}} id={window.location.pathname == val.link ? "active" : ""} onClick={() => {
            //     window.location.pathname = val.link;
            // }}>
            //     <div className="mt-1">{val.icon}</div>
            //     <div className="mx-2">{val.title}</div>
            // </li>
          );
        })}
        {localStorage.getItem('role') === 'admin' ? (
          <li
            className='row level px-1'
            style={{ justifyContent: 'left' }}
            id={window.location.pathname === '/users' ? 'active' : ''}
          >
            <Link to='/users'>
              <div className='mt-1'>
                <PeopleIcon />
              </div>
              <div className='mx-2'>Users</div>
            </Link>
          </li>
        ) : (
          <div></div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
