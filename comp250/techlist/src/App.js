import React from 'react';
import logo from './logo.svg';
import './App.css';
import TechComp from './components/TechComp'
import Jobs from './components/Jobs'
import Parts from './components/Parts'
import { NavLink, Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'

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
      <Router>
        <div className="App">
          <NavLink
            to='/techs'>
              Technicians
          </NavLink>
            <Jobs />
            <Parts />
            <Switch>
              <Route exact path='/techs' component={TechComp} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
