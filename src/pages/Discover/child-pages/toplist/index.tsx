import React, { memo, ReactElement, useEffect, useLayoutEffect, useState } from 'react'
import { getTopList, getTopListDetail } from '@/api/toplist'
import { ISongItem } from '@/store/modules/recommend/types'
import { Button } from 'antd'
import './index.scss'
import Utils from '@/utils'

interface IDetail {
  name: string, // 榜单名
  coverImgUrl: string, // 图片url
  updateTime: number, // 最近更新时间
  shareCount: number, // 分享次数
  subscribedCount: number, // 收藏次数
  playCount: number, // 播放次数
  tracks: Array<ISongItem>,  // 歌曲列表
  updateFrequency: string,  // 更新间隔
  id: number
}


const Toplist = () => {
  const [ current, setCurrent ] = useState<number>(0)
  const [ list, setList ] = useState<Array<IDetail>>([])
  const [ detail, setDetail ] = useState<IDetail>()

  useLayoutEffect(() => {
    const [request, canceler] = getTopList()
    request.then(result => {
      const { code, list } = result.data
      if (code === 200) {
        setList(list)
        _getTopListDetail(list[0].id)
      }
    })
    return () => {
      canceler && canceler()
    }
  }, [])

  // 获取某榜单详情
  const _getTopListDetail = (id: number): void => {
    const [ request, canceler ] = getTopListDetail(id)
    request.then(result => {
      const { code, playlist } = result.data
      for (let i = 0; i < playlist.tracks.length; i++) {
        const element = playlist.tracks[i];
        let arr = []
        for (let j = 0; j < element.ar.length; j++) {
          arr.push(element.ar[j].name)
        }
        element.author = arr.join('、')
      }
      if (code === 200) setDetail(playlist)
    })
  }

  const _renderSideItem = (item: IDetail, index: number): ReactElement => {
    return (
      <div className={['side-item', index === current ? 'active': ''].join(' ')} key={index} onClick={() => {setCurrent(index);_getTopListDetail(item.id)}}>
        <img src={ item.coverImgUrl } style={{ width: '44px', height: '44px' }} />
        <div className="descript">
          <span className="name">{ item.name }</span>
          <span className="tip">{ item.updateFrequency }</span>
        </div>
      </div>
    )
  }

  const _renderTableRow = (item: ISongItem, index: number): ReactElement => {
    return (
      <div className="table-row" key={index} style={{backgroundColor: index % 2 !== 0 ? 'rgb(247, 247, 247)': '#fff'}}>
        <div>{ index + 1 }</div>
        <div>
          { item.name }
        </div>
        <div>-</div>
        <div>{ item.author }</div>
      </div>
    )
  }

  const _renderTable = () => {
    const songs = detail?.tracks
    return (
      <div className="song-wrapper">
        <div className="title-wrapper">
          <h4 className="title">歌曲列表</h4>
          <span>播放：<i>{ detail?.playCount }</i>次</span>
        </div>
        <div className="table-body">
          <div className="table-row" style={{backgroundColor: 'rgb(247, 247, 247)'}}>
            <div></div>
            <div>标题</div>
            <div>时长</div>
            <div>歌手</div>
          </div>
          {songs && songs.map((item: ISongItem, index: number) => _renderTableRow(item, index))}
        </div>
      </div>
    )
  }

  return (
    <div className="rank w980">
      <div className="rank-side">
        {/* <h4>云音乐特色棒4</h4> */}
        {list && list.map((item: IDetail, index: number) => _renderSideItem(item, index))}
      </div>
      <div className="rank-cn">
        <div className="introduce">
          <img src={detail?.coverImgUrl} style={{width: '150px', height: '150px' }} />
          <div className="introduce-info">
            <span className="name">{ detail?.name }</span>
            <span>最近更新：{ detail?.updateTime && Utils.formatTime(new Date(detail.updateTime)) }</span>
            <div className="btn-wrapper">
              <Button size="small" className="btn-logo">登录</Button>
              <Button size="small" className="btn-logo">收藏</Button>
              <Button size="small" className="btn-logo">下载</Button>
            </div>
          </div>
        </div>
        {_renderTable()}
      </div>
    </div>
  );
}

export default memo(Toplist)