import React from 'react';

import './Dashboard.scss';

function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="balance">
        {/* <h3>Balance</h3> */}
        <p className="eth-balance">
          3,4 ETH <span>$1,200 USD</span>
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
