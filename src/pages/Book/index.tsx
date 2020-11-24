import React from 'react';
import {

} from 'antd'
import CategoryHeader from '@/components/CategoryHeader'
import Block from './components/block'

export default function Book () {
  const cates = [
    {name: '购书单'},
    {name: '电子图书'}
  ]
  return (
    <div>
      <CategoryHeader
        placeholder='书名、作者、ISBN'
        cates={cates}
      />
      <Block
       />
      book
    </div>
  );
}