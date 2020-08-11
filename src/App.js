import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Home from './components/Home';
import Traininglist from "./components/Traininglist";
import ShowCalendar from './components/ShowCalendar';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';


function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Pete's fitnesspals
          </Typography>
        </Toolbar>
      </AppBar>

      <BrowserRouter>
        <div>
          <Button style={{margin:15}} variant="outlined" color="primary"><Link to="/">Home</Link></Button>{' '}
          <Button style={{margin:15}} variant="outlined" color="primary"><Link to="/customers">customers</Link></Button>{' '}
          <Button style={{margin:15}} variant="outlined" color="primary"><Link to="/trainings">all trainings</Link></Button>{' '}
          <Button style={{margin:15}} variant="outlined" color="primary"><Link to="/calendar">calendar</Link></Button>

          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/customers" component={Customerlist}></Route>
            <Route path="/trainings" component={Traininglist}></Route>
            <Route path="/calendar" component={ShowCalendar}></Route>
            <Route render={() => <h1>Page not found!</h1>}></Route>
          </Switch>

        </div>

      </BrowserRouter>
      
    </div>
  );
}

export default App;

