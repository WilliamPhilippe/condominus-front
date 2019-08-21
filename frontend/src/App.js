import React from 'react';

import './App.css';
import Routes from './routes';

import Header from './componets/header/header';

const App = () => (
  <div className="app">
    <Header />
    <div id="main">
      <Routes />
    </div>
  </div>
)

export default App;