import React, { memo, useEffect, useState } from 'react';
import { getSongs } from '@/api/songs'
import { ISongItem } from '@/store/modules/recommend/types';
import './index.scss'
import { SongItem } from '@/components/SongItem'
import { Pagination } from 'antd'
import Layout from '@/components/Layout'
const Songs =  () => {
  const [ songList, setSongList ] = useState<Array<ISongItem>>()
  const [ total, setTotal ] = useState<number>(0)

  useEffect(() => {
    _getSongList(1)
  }, [])

  // 分页切换
  const _pageChange = (page: number) => {
    _getSongList(page - 1)
  }

  // 获取歌单数据
  const _getSongList = (page: number) => {
    const [ request ] = getSongs(page - 1)
    request.then(result => {
      const { code, playlists, total } = result.data
      if (code === 200) {
        setSongList(playlists)
        setTotal(total)
      }
    })
  }

  return (
    <Layout title='全部' style={{width: '980px', margin: 'auto', marginTop: '40px'}}>
      <div className="songs-wrapper w980">
        <div className="songs">
          {songList && songList.map((item, index) => <SongItem song={item} key={index} />)}
        </div>
        <Pagination 
          onChange={_pageChange}
          showSizeChanger={false}
          defaultCurrent={1} 
          total={total} 
          pageSize={35} />
      </div>
    </Layout>
  );
}

export default memo(Songs)