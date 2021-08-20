import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { addressTrim, deviceType } from '../helper';

import './Topbar.scss';

function Topbar({ initAccount }) {
  const { ethereum } = window;
  const [account, setAccount] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (ethereum) {
      ethereum.request({ method: 'eth_accounts' }).then((addr) => {
        if (addr.length > 0) {
          setAccount(addr[0]);
          initAccount(addr[0]);
        }
      });
    }
  }, [ethereum]);

  const connectWallet = async () => {
    if (account) {
      return;
    }

    //device is desktop, no mm installed
    if (!ethereum && deviceType() === 'desktop') {
      return;
    }

    //device is desktop, mm installed
    if (deviceType() === 'desktop' && ethereum) {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const acc = accounts[0];
      setAccount(acc);
      initAccount(acc);
    }
    //device is mobile, outside mm
    if (deviceType() !== 'desktop' && !ethereum) {
      setOpenModal(true);
    }

    //devicve is mobile, inside mm
    if (deviceType() !== 'desktop' && ethereum) {
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      const acc = accounts[0];
      setAccount(acc);
      initAccount(acc);
    }
  };

  return (
    <div className="Topbar">
      <div className="modal" style={{ display: openModal ? 'block' : 'none' }}>
        <div>
          <a href="https://metamask.app.link/dapp/donata-app.web.app">
            Open MetaMask
          </a>
          <p onClick={() => setOpenModal(false)}>close</p>
        </div>
      </div>
      <div className="hamburger-menu" onClick={() => setShowMenu(!showMenu)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-menu-2"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ff4495"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      <button onClick={connectWallet}>
        {account ? addressTrim(account) : 'CONNECT'}
      </button>
      <a
        href={`https://donata.social/user/${account}`}
        target="_blank"
        rel="noreferrer noopener"
        className="my-page"
      >
        My Page
      </a>

      <div className="mobile-menu" style={{ right: showMenu ? '0' : '-100%' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-square-x close"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ff4495"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => setShowMenu(false)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M10 10l4 4m0 -4l-4 4" />
        </svg>
        <NavLink exact to="/">
          Dashboard
        </NavLink>
        <NavLink to="/setting">Settings</NavLink>
      </div>
    </div>
  );
}

export default Topbar;
