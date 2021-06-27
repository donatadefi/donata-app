import React from 'react';

import './Setting.scss';

function Setting({ account }) {
  return (
    <div className="Setting">
      <div className="user-detail">
        <div className="user-photo">
          <div>Photo</div>
          <button>Upload Picture</button>
        </div>
        <div>
          <p>Description</p>
        </div>
      </div>
    </div>
  );
}

export default Setting;
