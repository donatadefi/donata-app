import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../assets/donata-logo.png';
import './Sidebar.scss';

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="" />
        <h3>DONATA</h3>
      </div>
      <div className="sidebar-menu">
        <NavLink exact to="/">
          Dashboard
        </NavLink>
        <NavLink to="/setting">Setting</NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
