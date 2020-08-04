/**
 * @format
 */
import React from 'react';
import {AppRegistry, Text} from 'react-native';
import Router from './src/router';

import {name as appName} from './app.json';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './src/stores/reducers'

const store = createStore(rootReducer)

function App () {
  return <Provider store={store}>
    <Router />
  </Provider>
}

AppRegistry.registerComponent(appName, () => App);
