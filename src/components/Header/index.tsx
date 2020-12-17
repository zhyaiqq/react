import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { headerLinks } from '@/assets/local-data'
import { Select, Button, Spin } from 'antd';
import './index.scss'
import { AppState } from '@/store'
import { changeSearchSongListAction } from '@/store/modules/header/actions'
import { ISongItem } from '@/store/modules/header/types'
import * as api from '@/api/header'
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom'
const { Option } = Select;

function Header (props: any) {
  const dispatch = useDispatch()
  const [ value, setValue ] = useState('')
  const [ fetching, setFetching ] = useState(false)
  const searchSongList: Array<ISongItem> = useSelector((state: AppState) => state.header.searchSongs)

  const handleChange = (text: string) => setValue(text)

  const handleSearch = (text: string) => {
    const [request, canceler ] = api.searchSongList(text)
    request.then(result => {
      dispatch(changeSearchSongListAction(result.data.result.songs))
    })
  }

  let match = useRouteMatch({
    path: '/discover',
    strict: true,
    sensitive: true
  })

  return (
    <div className="header">
      <div className="header-content w1100 clearfix">
        <h1 className="fl" style={{fontSize: 0}}>
          <a href="/" className="header-logo"></a>
        </h1>
        <div className="header-list fl">
          {headerLinks.map((tab, i) => <NavLink className='header-item' activeClassName='active' to={tab.link} key={i}>{tab['title']}</NavLink>)}
        </div>
        <div className="header_right fr">
          <Select
            showSearch
            value={value}
            placeholder="Select users"
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            style={{ width: '150px' }}
          >
            {searchSongList && searchSongList.map((song: ISongItem, index: number) => (
              <Option value={song.name} key={index}>{song.name}</Option>
            ))}
          </Select>
          <Button shape="round" size="small" className="btn-author">创作者中心</Button>
          <Button type="text" size="small" className="btn-logo">登录</Button>
        </div>
      </div>
      { !match && <div className="bg-line"></div> }
    </div>
  )
}

export default memo(Header)