import React, { useState, useEffect } from 'react';
import web3 from 'web3';
import { getBalance, getEthPrice } from '../helper';

import './Dashboard.scss';

const Web3 = new web3(
  new web3.providers.HttpProvider(
    'https://mainnet.infura.io/v3/5d77daec222d4ad994408839514891ee'
  )
);

function Dashboard({ account }) {
  const [ethBalance, setEthBalance] = useState('');
  const [tokenList, setTokenList] = useState([]);
  const [ethusdBalance, setEthUsdBalance] = useState('');
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
        setEthBalance(trimmedBalance.join('') + ' ' + 'ETH');

        getEthPrice()
          .then((res) => res.json())
          .then((data) => {
            const bal =
              Number(trimmedBalance.join('')) * Number(data.data.result.ethusd);
            const currencyConvert = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            });
            setEthUsdBalance(currencyConvert.format(bal));
          });
      }
    });
    const reqBody = {
      account,
    };
    fetch('http://localhost:5000/user', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result.data) {
          if (result.data.tokensList) {
            const sometoken = [];
            result.data.tokensList.forEach((token) => {
              if (token.address) {
                getBalance(account, token.address).then((res) => {
                  const obj = {
                    name: token.name,
                    balance: res,
                    address: token.address,
                    id: token.id,
                  };
                  sometoken.push(obj);
                  setTokenList([...sometoken], obj);
                });
                // const tokenObj = tokenObjInit(token.id, token.name);
              }
            });
          }
        } else {
          return;
        }
      });
  }, []);

  return (
    <div className="Dashboard">
      <div className="balance">
        {/* <h3>Balance</h3> */}
        <p className="eth-balance">
          {ethBalance} <span>{ethusdBalance}</span>
        </p>

        <div className="tokens-balance">
          {tokenList.map((token) => {
            return (
              <p key={token.id}>
                {token.balance} {token.name}
              </p>
            );
          })}
        </div>
        <a href="https://etherscan.io">Check at Etherscan</a>
      </div>
      <div className="out-links">
        <p>
          <a
            className="zerion-link"
            href={`https://app.zerion.io/${account}/overview`}
            target="_blank"
          >
            {' '}
            Check all holdings value at ZERION
          </a>
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
