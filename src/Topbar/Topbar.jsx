import React, { useState, useEffect } from 'react';

import { addressTrim } from '../helper';

import './Topbar.scss';

function Topbar({ initAccount }) {
  const { ethereum } = window;
  const [account, setAccount] = useState('');

  useEffect(() => {
    ethereum.request({ method: 'eth_accounts' }).then((addr) => {
      if (addr.length > 0) {
        setAccount(addr[0]);
        initAccount(addr[0]);
      }
    });
  }, []);

  const connectWallet = async () => {
    if (account) {
      return;
    }
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    });
    const acc = accounts[0];
    setAccount(acc);
    initAccount(acc);
  };

  return (
    <div className="Topbar">
      <button onClick={connectWallet}>
        {account ? addressTrim(account) : 'CONNECT'}
      </button>
    </div>
  );
}

export default Topbar;
