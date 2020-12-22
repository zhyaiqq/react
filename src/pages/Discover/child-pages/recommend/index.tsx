import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import TopBanners from './components/top-banners'
import Layout from './components/layout'
import './index.scss'
import { Carousel } from 'antd'
import { changeHotRecommendSongs, changeNewCDs } from '@/store/modules/recommend/actions'
import { getHotRecommendSongs, getNewCDs, getTopList, getSingers } from '@/api/recommend'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/store';
import { ISongItem } from '@/store/modules/recommend/types';

interface ITopDetail {
  coverImgUrl: string,
  name: string,
  tracks: Array<ISongItem>
}

interface ISinger {
  picUrl: string,
  name: string
}

// 热门推荐
const Hot = () => {
  const keywords = ['华语', '流行', '摇滚']
  const dispatch = useDispatch()

  useEffect(() => {
    const [ request, canceler ] = getHotRecommendSongs()
    request.then(result => {
      const { code, result: hotSongs } = result.data
      if (code === 200) dispatch(changeHotRecommendSongs(hotSongs))
    })
    return () => {
      canceler && canceler()
    }
  }, [])

  const { hotRecommendSongs } = useSelector((state: AppState) => state.recommend)

  // 主要内容布局
  const _renderCnItem = (item: ISongItem, index: number): ReactElement => {
    return (
      <div className="hot-item">
        <img src={item.picUrl} style={{width: '140px', height: '140px' }} />
        <span>{ item.name }</span>
        <span>{ item.copywriter }</span>
      </div>
    )
  }

  return (
    <Layout
      title="热门推荐"
      keywords={keywords}>
        <div className="hot-cn">
          { hotRecommendSongs.map((item, index) => _renderCnItem(item, index)) }
        </div>
    </Layout>
  )
}

// 新碟上架
const NewCD = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const [ request, canceler ] = getNewCDs()
    request.then(result => {
      const { code, albums } = result.data
      for (let i = 0; i < albums.length; i++) { albums[i].author = albums[i].artist.name }
      if (code === 200) dispatch(changeNewCDs(albums))
    })
    return () => {
      canceler && canceler()
    }
  }, [])

  const { newCDs } = useSelector((state: AppState) => state.recommend)

  // 主要内容布局
  const _renderCnItem = (item: ISongItem, index: number): ReactElement => {
    return (
      <div className="new-item" key={index}>
        <img src={item.picUrl} style={{width: '100px', height: '100px' }} />
        <div className={['name', 'ellipsis'].join(' ')}>{item.name}</div>
        <div className={['author', 'ellipsis'].join(' ')}>{item.author}</div>
      </div>
    )
  }

  return (
    <Layout title="新碟上架">
      <div className="new-cn">
        <Carousel afterChange={() => {}} style={{margin: '0 25px'}}>
          <div className="new-box">
            { newCDs.splice(0, 5).map((item, index) => _renderCnItem(item, index))}
          </div>
          <div className="new-box">
            { newCDs.splice(5, 10).map((item, index) => _renderCnItem(item, index))}
          </div>
        </Carousel>
        <div className="ctrl">
          <div className="btn" onClick={() => console.log()}></div>
          <div className="btn" onClick={() => {}}></div>
        </div>
      </div>
    </Layout>
  )
}

// 榜单
const TopList = () => {
  const [ list1, setList1 ] = useState<ITopDetail | null>(null)
  const [ list2, setList2 ] = useState<ITopDetail | null>(null)
  const [ list3, setList3 ] = useState<ITopDetail | null>(null)

  useEffect(() => {
    const [ requestList1, canceler1 ] = getTopList(19723756)
    const [ requestList2, canceler2 ] = getTopList(3779629)
    const [ requestList3, canceler3 ] = getTopList(2884035)
    
    requestList1.then(result => {
      const { playlist, code } = result.data
      if (code === 200) setList1(playlist)
    })
    requestList2.then(result => {
      const { playlist, code } = result.data
      if (code === 200) setList2(playlist)
    })
    requestList3.then(result => {
      const { playlist, code } = result.data
      if (code === 200) setList3(playlist)
    })
    return () => {
      canceler1 && canceler1()
      canceler2 && canceler2()
      canceler3 && canceler3()
    }
  }, [])

  // 主要内容布局
  const _renderCnItem = (data: ITopDetail | null, index: number): ReactElement | null => {
    if (!data) return null
    return (
      <div className="toplist-item" key={index}>
        <div className="introduce">
          <img src={data.coverImgUrl} style={{ width: '80px', height: '80px' }} />
          <h4>{data.name}</h4>
        </div>
        <div className="list">
          {data.tracks && data.tracks.splice(0, 10).map((el: ISongItem, i: number) => {
            return <div key={i} className="list-item" style={{background: i % 2 !== 0 ? '#f5f5f5' : '#fff'}}>
              <span>{i + 1}</span>
              <span className={['name', 'ellipsis'].join(' ')}>{el.name}</span>
            </div>
          })}
        </div>
      </div>
    )
  }

  return (
    <Layout
      title="榜单">
        <div className="toplist-cn">
          { [list1, list2, list3].map((data, index) => _renderCnItem(data, index))}
        </div>
    </Layout>
  )
}

export default function Recommend () {
  const [ singers, setSingers ] = useState<Array<ISinger>>([])
  useEffect(() => {
    const [ request, canceler ] = getSingers()
    request.then(result => {
      const { code, artists } = result.data
      if (code === 200) setSingers(artists)
    })
    return () => {
      canceler && canceler()
    }
  }, [])
  return (
    <>
      <TopBanners />
      <div className="w980" style={{marginTop: '20px'}}>
        <div className="recommend-left">
          <Hot />
          <NewCD />
          <TopList />
        </div>
        <div className="recommend-right">
          <div className="singer-wrapper">
            <div className="singer-title">
              <h4>入驻歌手</h4>
              <span className="more">查看全部 &gt;</span>
            </div>
            {singers && singers.map((singer, index ) => <div className="singer-item" key={index}>
              <img src={singer.picUrl} style={{width: '62px', height: '51px', marginRight: '10px'}} />
              <span>{singer.name}</span>
            </div>)}
          </div>
        </div>
      </div>
    </>
  );
}