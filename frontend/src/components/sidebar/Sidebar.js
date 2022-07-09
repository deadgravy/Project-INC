import React from 'react';
import '../../styles/sidebar.css';
import { SidebarData } from './SidebarData';

const Sidebar = () => {
  return (
    <div className="card h-screen p-2">
        <img src={require('../../logos/firc-logo.png')} alt=''/>
        <ul className="p-0 m-0">
            {SidebarData.map((val, key) => {
                return (
                    <li key={key} className="row level px-1" style={{justifyContent: 'left'}} id={window.location.pathname == val.link ? "active" : ""} onClick={() => {
                        window.location.pathname = val.link;
                    }}>
                        <div className="mt-1">{val.icon}</div>
                        <div className="mx-2">{val.title}</div>
                    </li>
                )
            })}
        </ul>
    </div>
  );
};

export default Sidebar;
