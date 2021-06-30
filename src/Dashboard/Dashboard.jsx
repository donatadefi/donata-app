import React, { useState, useEffect } from 'react';
import web3 from 'web3';

import './Dashboard.scss';

const Web3 = new web3(
  new web3.providers.HttpProvider(
    'https://mainnet.infura.io/v3/5d77daec222d4ad994408839514891ee'
  )
);

function Dashboard({ account }) {
  const [ethBalance, setEthBalance] = useState('');
  useEffect(() => {
    Web3.eth.getBalance(account, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        const blnc = web3.utils.fromWei(result, 'ether') + ' ETH';
        let stopIdentifier = blnc.length;
        const trimmedBalance = [];
        for (let i = 0; i < blnc.length; i++) {
          trimmedBalance.push(blnc.charAt(i));
          if (blnc.charAt(i) === '.') {
            stopIdentifier = i + 3;
          }
          if (i >= stopIdentifier) {
            break;
          }
        }
        setEthBalance(trimmedBalance.join(''));
      }
    });
  }, []);

  return (
    <div className="Dashboard">
      <div className="balance">
        {/* <h3>Balance</h3> */}
        <p className="eth-balance">
          {ethBalance} <span>$1,200 USD</span>
        </p>

        <div className="tokens-balance">
          <p>3,980,800 HOGE</p>
          <p>2,000 DEXT</p>
          <p>47,988,567,908 SHIB</p>
        </div>
        <a href="https://etherscan.io">Check at Etherscan</a>
      </div>
      <div className="out-links">
        <p>
          <a className="zerion-link" href="">
            {' '}
            Check all holdings value at ZERION
          </a>
        </p>
        {/* <h3>Last 5 Txn</h3>
        <a href="https://etherscan.io/tx/0xc7687c6976123b37d6c7ae0041bcc590c633e42b220b872807aca426f15e208d">
          0xc7687c6976123b37d6c7ae0041bcc590c633e42b220b872807aca426f15e208d
        </a>
        <a href="https://etherscan.io/tx/0xc7687c6976123b37d6c7ae0041bcc590c633e42b220b872807aca426f15e208d">
          0xc7687c6976123b37d6c7ae0041bcc590c633e42b220b872807aca426f15e208d
        </a> */}
      </div>
    </div>
  );
}

export default Dashboard;
