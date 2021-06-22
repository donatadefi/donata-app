import { BrowserRouter } from 'react-router-dom';

import Sidebar from './sidebar/Sidebar';
import TopBar from './Topbar/Topbar';
import Main from './Main/Main';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="parent-flex">
          <div className="parent-left">
            <Sidebar></Sidebar>
          </div>
          <div className="parent-right">
            <TopBar></TopBar>
            <Main></Main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
