import React, { useState, useEffect } from 'react';

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

  const addressTrim = (str) => {
    const trimmedStr = str.slice(0, 6) + '...' + str.slice(38);
    return trimmedStr;
  };

  return (
    <div className="Topbar">
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-round-flat%2F33%2Fman5-512.png&f=1&nofb=1"
        alt=""
      />
      <button onClick={connectWallet}>
        {account ? addressTrim(account) : 'CONNECT'}
      </button>
    </div>
  );
}

export default Topbar;
