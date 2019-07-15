import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import TechComp from './components/TechComp'
import Jobs from './components/Jobs'
import Parts from './components/Parts'
import { NavLink, Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      displayTech: false,
      test: 'testing'
    }
  }


  render() {
    return (
      <Router>
        <div className="App">
          <h1>hi</h1>
          <NavLink
            to='/'>
              Home
          </NavLink>
          <NavLink
            to='/jobs'>
              Jobs
          </NavLink>
          <NavLink to={{
            pathname:'/techs',
            state: {test2: 'test2'}
          }}>
              Technicians
          </NavLink>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/techs' component={TechComp} />
              <Route path='/jobs' component={Jobs} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
