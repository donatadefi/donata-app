import React from 'react';
import { Input, Checkbox } from 'antd';

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
      <div className="user-socials mt-30">
        <div>
          <h3>Socials</h3>
          <div className="social-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-twitter"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#00abfb"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
            </svg>
            <Input placeholder="URL" />
          </div>
          <div className="social-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-youtube"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ff2825"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="3" y="5" width="18" height="14" rx="4" />
              <path d="M10 9l5 3l-5 3z" />
            </svg>
            <Input placeholder="URL" />
          </div>
          <div className="social-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-twitch"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#a905b6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 5v11a1 1 0 0 0 1 1h2v4l4 -4h5.584c.266 0 .52 -.105 .707 -.293l2.415 -2.414c.187 -.188 .293 -.442 .293 -.708v-8.585a1 1 0 0 0 -1 -1h-14a1 1 0 0 0 -1 1z" />
              <line x1="16" y1="8" x2="16" y2="12" />
              <line x1="12" y1="8" x2="12" y2="12" />
            </svg>
            <Input placeholder="URL" />
          </div>
          <div className="social-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-instagram"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#fd0061"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x="4" y="4" width="16" height="16" rx="4" />
              <circle cx="12" cy="12" r="3" />
              <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
            </svg>
            <Input placeholder="URL" />
          </div>
          <div className="social-input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-tiktok"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#6f32be"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 12a4 4 0 1 0 4 4v-12a5 5 0 0 0 5 5" />
            </svg>
            <Input placeholder="URL" />
          </div>
          <button className="set-action">Set</button>
        </div>

        <div>
          <h3>Token Setting</h3>
          <div>
            <Checkbox>Allow custom token</Checkbox>
          </div>
          <div className="token-choice">
            <Input placeholder="Token Address" />
            <button className="circle remove">&#8722;</button>
            <p>Token Name</p>
          </div>
          <div className="token-choice">
            <Input placeholder="Token Address" />
            <button className="circle remove">&#8722;</button>
            <p>Token Name</p>
          </div>
          <div className="token-action">
            <button className="circle">+</button>
            <button className="set-action">Set</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
