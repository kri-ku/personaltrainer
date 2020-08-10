import React from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
//import Traininglist from './components/Traininglist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Home from './components/Home';
import Traininglist2 from "./components/Traininglist2";

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
          <Button style={{margin:15}} variant="outlined" color="primary"><Link to="/trainingsuusi">all trainings</Link></Button>

          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/customers" component={Customerlist}></Route>
            <Route path="/trainingsuusi" component={Traininglist2}></Route>
            <Route render={() => <h1>Page not found!</h1>}></Route>
          </Switch>

        </div>

      </BrowserRouter>



      
    </div>
  );
}

export default App;

