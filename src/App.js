import React from "react";
import './assets/styles/main.scss';
import AuthPage from './pages/AuthPage'
import { Switch, Route } from 'react-router-dom';
import {Redirect} from "react-router";
import Home from "./pages/Home";
import {getToken} from "./helpers/getToken";

function App() {
  const token = getToken()
  return (
    <div className='app'>
      <Switch>
        <Route exact path="/">
          { !token && <Redirect to='/sign-up'/> || <Redirect to='/home'/> }
        </Route>
        <Route exact path="/home" component={Home}>
          { !token && <Redirect to='/sign-up'/> }
        </Route>
        <Route
          exact
          path="/sign-up"
          component={AuthPage}
        />
      </Switch>
    </div>
  )
}

export default App;