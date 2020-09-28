import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  useEffect(() => {
    axios.get('/user');
  }, []);
  return (
    <div className="App">
      <h1>SWPP HW3!</h1>
    </div>
  );
}

export default App;
