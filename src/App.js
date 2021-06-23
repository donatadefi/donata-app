
import React, { useState, useEffect } from 'react';

import { BrowserRouter } from 'react-router-dom';

import Sidebar from './sidebar/Sidebar';
import TopBar from './Topbar/Topbar';
import Main from './Main/Main';

import './App.scss';

function App() {
  const { ethereum } = window;
  const [account, setAccount] = useState('');

  useEffect(() => {
    //this checks whether the account already connected or not
    ethereum.request({ method: 'eth_accounts' }).then((addr) => {
      if (addr.length > 0) {
        setAccount(addr[0]);
      }
    });
  }, []);

  const initAccount = (acc) => {
    setAccount(acc);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <div className="parent-flex">
          <div className="parent-left">
            <Sidebar></Sidebar>
          </div>
          <div className="parent-right">
            <TopBar initAccount={initAccount}></TopBar>
            <Main account={account}></Main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
