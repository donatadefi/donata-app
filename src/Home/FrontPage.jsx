import React, { useEffect, useState } from 'react';

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

  const renderUser = () => {
    return usersList.map((user) => {
      return (
        <div key={user.id}>
          <p>{user.description}</p>
          <p>{user.id}</p>
          <img src={user.photoUrl} alt="user-pic" />
        </div>
      );
    });
  };

  return <div className="FrontPage">{renderUser()}</div>;
}

export default FrontPage;
