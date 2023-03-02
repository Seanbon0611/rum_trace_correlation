import logo from './logo.svg';
import './App.css';
import MakeRequest from './componenets/make-request/makeRequest';
import { useState } from 'react';

function App() {

  const [message, setMessage]= useState("")


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MakeRequest setMessage={setMessage}/>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
