
import { CHANGE_HOT_RECOMMEND, CHANGE_NEW_CDS, CHANGE_TOP_BANNER } from './constans'
import { IBanner, ISongItem,  IRecommendAction } from './types'


// 轮播图
export const changeTopBannerAction = (topBanners: Array<IBanner>):IRecommendAction  => ({
  type: CHANGE_TOP_BANNER,
  payload: {
    topBanners
  }
})

// 热门推荐歌单
export const changeHotRecommendSongs = (hotRecommendSongs: Array<ISongItem>):IRecommendAction  => ({
  type: CHANGE_HOT_RECOMMEND,
  payload: {
    hotRecommendSongs
  }
})

// 新碟上架
export const changeNewCDs = (newCDs: Array<ISongItem>):IRecommendAction  => ({
  type: CHANGE_NEW_CDS,
  payload: {
    newCDs
  }
})

// 榜单
export const changeTopList = (topList: Array<ISongItem>):IRecommendAction  => ({
  type: CHANGE_HOT_RECOMMEND,
  payload: {
    topList
  }
})