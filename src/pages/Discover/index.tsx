import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink
} from "react-router-dom";
import { dicoverMenu } from '@/assets/local-data'
import Album from './child-pages/album'
import Artist from './child-pages/artist'
import Djradio from './child-pages/djradio'
import Recommend from './child-pages/recommend'
import Songs from './child-pages/songs'
import Toplist from './child-pages/toplist'
import './index.scss'

export default function Music () {
  return (
    <div className="discover">
      <Router>
        <div className="menu">
          <div className="w1100 menu-list">
            {dicoverMenu.map(item => <NavLink to={item.link} activeClassName="menu-active">{item.title}</NavLink>)}
          </div>
        </div>
        <Switch>
          <Route path="/discover/recommend" component={Recommend} />
          <Route path="/discover/ranking" component={Toplist} />
          <Route path="/discover/album" component={Album} />
          <Route path="/discover/djradio" component={Djradio} />
          <Route path="/discover/artist" component={Artist} />
          <Route path="/discover/songs" component={Songs} />
          <Route path="/discover/ong" component={Songs} />
          <Redirect from='/discover' to='/discover/recommend' />
        </Switch>
      </Router>
    </div>
  );
}