import './App.css';
import React from 'react';
import isLoggedIn from './utils/isLoggedIn';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home.js';

function App() {
  return (
    <div className="App">
      {
        (isLoggedIn() === true) ? (<Home></Home>) : (<Auth></Auth>)
      }
    </div>
  );
}

export default App;
