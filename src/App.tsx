import React, { memo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.scss'
import Home from "@/pages/Home"
import Friend from "@/pages/Friend"
import Mine from "@/pages/Mine"
import Discover from "@/pages/Discover"
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
            {/* <Route path="/home" component={Home} /> */}
            <Route path="/discover" component={Discover} />
            <Route path="/friend" component={Friend} />
            <Route path="/mine" component={Mine} />
            <Redirect from='/' to='/discover' />
          </Switch>
          <Footer />
        </Router> 
      </div>
    </Provider>
  )
}

export default memo(App)