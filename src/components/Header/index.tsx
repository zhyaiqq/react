import React, { memo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { headerLinks } from '@/assets/local-data'
import { Select, Button, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';
import './index.scss'
import {
  getSearchSongListAction
} from './store/actions'
import { useDispatch, useSelector } from 'react-redux';
import { IdefaultState } from './store/interface'
const { Option } = Select;

function Header () {
  const dispatch = useDispatch()
  const [ value, setValue ] = useState('')
  const [ fetching, setFetching ] = useState(false)
  const result: any = useSelector(state => state)

  const handleChange = (text: string) => {
    console.log('change')
    setValue(text)
    console.log('2222')
  }

  const handleSearch = (text: string) => {
    console.log('search', text)
    // 发起网络请求
    dispatch(getSearchSongListAction(text))
  }

  return (
    // const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>)
    <div className="header">
      <div className="header-content w1100 clearfix">
        <h1 className="fl">
          <a href="/" className="header-logo"></a>
        </h1>
        <div className="header-list fl">
          {headerLinks.map((tab, i) => <NavLink className='header-item' activeClassName='active' to={tab.link} key={i}>{tab['title']}</NavLink>)}
        </div>
        <div className="header_right fr">
          <Select
            mode="multiple"
            labelInValue
            value={value}
            placeholder="Select users"
            notFoundContent={fetching ? <Spin size="small" /> : null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            style={{ width: '150px' }}
          >
            {/* {data.map(d => (
              <Option key={d.value}>{d.text}</Option>
            ))} */}
          </Select>
          <Button shape="round" size="small">创作中心</Button>
          <Button type="text" size="small">登录</Button>
        </div>
      </div>
    </div>
  )
}

export default memo(Header)