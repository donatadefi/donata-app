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
        <div className="user-description">
          <div>
            <textarea
              name="description"
              id="1"
              placeholder="Write your description here"
            ></textarea>
          </div>
          <button>Set Description</button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
