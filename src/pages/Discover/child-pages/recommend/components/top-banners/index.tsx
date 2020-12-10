import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IBanner, IRecommendState } from '../../store/types'
import {
  getTopBannersAction
} from '../../store/actionCreator'
import './index.scss'
import { Carousel, Button } from 'antd'

function TopBanners () {
  // 组件内state
  const [ currentIndex, setCurrentIndex ] = useState(0)

  const dispatch = useDispatch()
  let { topBanners }= useSelector((state: any) => {
    return state.recommend
  })
  useEffect(() => {
    // 在组件渲染之后发送网络请求
    dispatch(getTopBannersAction())
  }, [dispatch])

  const bannerRef = useRef(null)

  const bgImage =
    topBanners &&
    topBanners[currentIndex] &&
    topBanners[currentIndex].imageUrl + '?imageView&blur=40x20'

  return (
    <div className="banner-wrap" style={{backgroundImage: 'url('+ bgImage +')'}}>
      <div className="banner w980">
        <div className="left">
          <Carousel
            beforeChange={useCallback((from: number, to: number) => setCurrentIndex(to), [])}
            effect="fade"
            autoplay
            ref={bannerRef}>
            {topBanners && topBanners.map((banner: IBanner, index: number) => <img src={banner.imageUrl} key={index} style={{width: '100%', height: '100%'}} />)}
          </Carousel>
        </div>
        <a href="https://music.163.com/#/download" target="_blank" className="right"></a>
        <div className="ctrl">
          <div className="btn" onClick={() => console.log(bannerRef.current)}></div>
          <div className="btn" onClick={() => {}}></div>
        </div>
      </div>
    </div>
  )
}

export default memo(TopBanners)