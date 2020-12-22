import { CHANGE_TOP_BANNER, CHANGE_HOT_RECOMMEND, CHANGE_NEW_CDS, CHANGE_TOP_LIST } from './constans'
import { IRecommendState, IRecommendAction } from './types'

const initialState: IRecommendState = {
  topBanners: [], // banner数据
  hotRecommendSongs: [], // 热门推荐歌曲
  newCDs: [], // 新碟上架
  topList: [] // 榜单
}

function reducer (state: IRecommendState = initialState, action: IRecommendAction) {
  switch (action.type) {
    case CHANGE_TOP_BANNER:
      // 这里有个坑必须返回一个新的state，不然不会监听到state变化
      return {
        ...state,
        topBanners: action.payload.topBanners
      }
    case CHANGE_HOT_RECOMMEND:
      return {
        ...state,
        hotRecommendSongs: action.payload.hotRecommendSongs
      }
    case CHANGE_NEW_CDS:
      return {
        ...state,
        newCDs: action.payload.newCDs
      }
    case CHANGE_TOP_LIST:
      return {
        ...state,
        topList: action.payload.topList
      }
    default:
      return state
  }
}

export default reducer