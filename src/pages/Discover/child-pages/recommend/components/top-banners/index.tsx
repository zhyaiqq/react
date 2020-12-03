import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRecommendState } from '../../store/types'
import {
  getTopBannersAction
} from '../../store/actionCreator'

function TopBanners () {
  const dispatch = useDispatch()
  let { topBanners }= useSelector((state: any) => {
    return state.recommend
  })
  console.log('ddd', topBanners)
  useEffect(() => {
    // 在组件渲染之后发送网络请求
    dispatch(getTopBannersAction())
  }, [dispatch])
  return (
    <div>{ }</div>
  )
}

export default memo(TopBanners)