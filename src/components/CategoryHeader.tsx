import React, { SFC } from 'react'
import {
  Image,
  List,
  Input,
  Button
} from 'antd'
const { Search } = Input

interface ICATE {
  name: string
}

interface IProps {
  placeholder: string,
  cates: ICATE[]
}

const CategoryHeader = ({placeholder, cates} : IProps) => {
  console.log(cates)
  return (
    <div className="cate-header">
      <div className="top-search">
        <h1 className="title">豆瓣读书</h1>
        <Search
          onSearch={(value) => {
            console.log(value)
          }}
          enterButton
          placeholder={placeholder}
        />
      </div>
      <div className="cates">
        {
          cates.map((cate, index) => <Button key={index} type="text">{cate.name}</Button>)
        }
      </div>
    </div>
  )
}

export default CategoryHeader