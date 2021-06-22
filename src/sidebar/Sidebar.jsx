import React from 'react';
import logo from '../assets/donata-logo.png';
import './Sidebar.scss';

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="" />
        <h3>DONATA</h3>
      </div>
    </div>
  );
}

export default Sidebar;
