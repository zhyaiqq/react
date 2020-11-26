import React, { memo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.scss'
import Home from "@/pages/Home"
import Movie from "@/pages/Movie"
import Book from "@/pages/Book"
import Music from "@/pages/Music"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import store from '@/store'
import { Provider } from 'react-redux'

function App () {
  return (
    <Provider store={store}>
      <div className="container">
        <Router>
          <Header />
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/discover" component={Book} />
            <Route path="/friend" component={Movie} />
            <Route path="/mine" component={Music} />
            <Redirect from='/' to='/home' />
          </Switch>
          <Footer />
        </Router> 
      </div>
    </Provider>
  )
}

export default memo(App)