import React, { useState, useEffect } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { deviceType } from './helper';

import Sidebar from './sidebar/Sidebar';
import TopBar from './Topbar/Topbar';
import Main from './Main/Main';
// import FrontPage from './Home/FrontPage';

import 'antd/dist/antd.css';
import './App.scss';

function App() {
  const { ethereum } = window;
  const [account, setAccount] = useState('');
  const [isMeta, setIsMeta] = useState(true);

  useEffect(() => {
    if (!ethereum) {
      setIsMeta(false);
    } else {
      // setIsMeta(true);
      ethereum.request({ method: 'eth_accounts' }).then((addr) => {
        if (addr.length > 0) {
          setAccount(addr[0]);
        }
      });
    }
  }, [ethereum]);

  const initAccount = (acc) => {
    if (!acc) {
      return;
    }
    setAccount(acc);
  };

  const mainComponent = () => {
    return (
      <div className="parent-flex">
        <div className="parent-left">
          <Sidebar />
        </div>
        <div className="parent-right">
          <TopBar initAccount={initAccount} />
          <Main account={account} />
          {!isMeta && (
            <a
              className="install-mm"
              href="https://metamask.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Install MetaMask
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          {/* <Route exact path="/frontpage" component={FrontPage} /> */}
          <Route path="/" component={mainComponent} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
