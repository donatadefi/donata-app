import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import Setting from '../Setting/Setting';
import './Main.scss';

function Main({ account }) {
  return (
    <div className="Main">
      {account ? (
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => <Dashboard account={account} {...props} />}
          />
          <Route
            path="/setting"
            component={(props) => <Setting account={account} {...props} />}
          />
        </Switch>
      ) : (
        <p className="connect-notif">Please connect your wallet</p>
      )}
    </div>
  );
}

export default Main;
