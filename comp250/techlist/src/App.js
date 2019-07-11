import React from 'react';
import logo from './logo.svg';
import './App.css';
import TechComp from './components/TechComp'
import Jobs from './components/Jobs'
import Parts from './components/Parts'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      displayTech: false
    }
  }


  displayHandler = (e) => {
    this.setState(prevState=> ({
      displayTech: !prevState.displayTech
    }))
  }

  render() {
    return (
      <div className="App">
        <p id='displayTech' onClick={this.displayHandler}>Technicians</p>
            {this.state.displayTech ? <TechComp /> : null}
          <Jobs />
          <Parts />
      </div>
    );
  }
}

export default App;
