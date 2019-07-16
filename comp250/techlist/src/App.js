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
      techs: [],
      jobs: [],
      parts: [],
    }
  }

 
componentDidMount() {
  Promise.all([
    fetch("http://127.0.0.1:5000/tech"),
    fetch("http://127.0.0.1:5000/jobs"),
    fetch("http://127.0.0.1:5000/parts")
  ])
  .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
  .then(([techsData, jobsData, partsData]) => this.setState({
    techs: techsData,
    jobs: jobsData,
    parts: partsData
  }))
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
