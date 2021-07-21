import React, { useEffect, useState } from 'react';

import { addressTrim } from '../helper';

import './FrontPage.scss';

function FrontPage() {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => {
        setUsersList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const trimWords = (str) => {
    if (str.length <= 100) {
      return;
    }
    const newStr = str.slice(0, 100) + '...';
    return newStr;
  };

  const renderUser = () => {
    return usersList.map((user) => {
      return (
        <div key={user.id} className="front-child">
          <img src={user.photoUrl} alt="user-pic" />

          <div className="front-details">
            <p>
              {' '}
              {trimWords(
                ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cupiditate ex voluptatem obcaecati officia necessitatibus facere consequuntur officiis quos molestias?'
              )}
            </p>
            <a
              href="https://etherscan.io"
              target="_blank"
              rel="noreferrer noopener"
            >
              {addressTrim(user.id)}
            </a>
          </div>
          <div className="name-wrapper">Donata Project</div>
        </div>
      );
    });
  };

  return <div className="FrontPage">{renderUser()}</div>;
}

export default FrontPage;
