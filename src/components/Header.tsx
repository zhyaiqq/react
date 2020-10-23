import React from 'react'
import { NavLink } from 'react-router-dom'
function Header () {
  const  tabs = [
    {name: '豆瓣', route: '/Home'},
    {name: '读书', route: '/book'},
    {name: '电影', route: '/movie'},
    {name: '音乐', route: '/music'}
  ]

  return (
    <div className="header">
      <ul className="header-list">
        {tabs.map((tab, i) => <NavLink className='header-item' activeClassName='active' to={tab.route} key={i}>{tab['name']}</NavLink>)}
      </ul>
    </div>
  )
}

export default Header