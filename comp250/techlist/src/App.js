import React from 'react';
import logo from './logo.svg';
import './App.css';
import TechComp from './components/TechComp'
import Jobs from './components/Jobs'
import Parts from './components/Parts'

function App() {
  return (
    <div className="App">
      <h1>TechList</h1>
      <TechComp />
      <Jobs />
      <Parts />
    </div>
  );
}

export default App;
