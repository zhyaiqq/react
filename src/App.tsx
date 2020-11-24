import React, {useState} from "react";
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

export default function App () {
  return (
    <div className="container">
      <Router>
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/book" component={Book} />
          <Route path="/movie" component={Movie} />
          <Route path="/music" component={Music} />
          <Redirect from='/' to='/home' />
        </Switch>
      </Router> 
    </div>
  )
}