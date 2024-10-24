import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // non-state
  // const variable = 10;

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // this code will excute whe counter changes
    console.log('COUNTER CHANGED', counter);
  }, [counter]);

  const handleAdd = () => {
    // console.log('HANDLE ADD CLICKED');
    let newCounter = counter;
    newCounter = newCounter * 10;
    setCounter(newCounter);
  };

  const handleSubtract = () => {
    // console.log('HANDLE SUBTRACT CLICKED');
    setCounter(counter - 1);
  }

  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={handleAdd}>Add +</button>
      <button onClick={handleSubtract}>Subtract -</button>
    </div>
  );
}

export default App;
