import { BrowserRouter } from 'react-router-dom';

import Sidebar from './sidebar/Sidebar';


import './App.scss';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Sidebar></Sidebar>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
