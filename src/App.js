import React from "react";
import './assets/styles/main.scss';
import AuthPage from './pages/AuthPage'
import { Switch, Route } from 'react-router-dom';
import {Redirect} from "react-router";
import Home from "./pages/Home";
import {getToken} from "./helpers/getToken";
import {useSelector} from "react-redux";
import {path} from "ramda";

function App() {
  const token = getToken()
  const { isLoading } = useSelector(state => state)
  return (
    <div className='app'>
      <Switch>
        {
          isLoading ? (
            <div>Loading...</div>
          ) :
            (
              <>
                <Route exact path="/">
                  {token ? <Redirect to="/home" /> : <AuthPage />}
                </Route>
                <Route path='/home'>
                  {token ? <Home /> : <Redirect to='sign-up' />}
                </Route>
                <Route path='/sign-up'>
                  {!token ? <AuthPage /> : <Redirect to='home' />}
                </Route>
              </>
            )
        }
      </Switch>
    </div>
  )
}

export default App;