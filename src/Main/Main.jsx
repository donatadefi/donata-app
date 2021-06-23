import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../Dashboard/Dashboard';
import Setting from '../Setting/Setting';
import './Main.scss';

function Main() {
  return (
    <div className="Main">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/setting" component={Setting} />
      </Switch>
    </div>
  );
}

export default Main;
