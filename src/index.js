import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import { Provider } from 'react-redux'
import App from './App'
import {createLogger} from "redux-logger/src";
import { BrowserRouter } from 'react-router-dom';

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import authReducer from "./redux/authReducer";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const middlewares = [thunk, createLogger({collapsed: true})]

const store = createStore(combineReducers({
  state: authReducer
}), compose(applyMiddleware(...middlewares)));

const rootElement = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </Provider>,
  rootElement
)