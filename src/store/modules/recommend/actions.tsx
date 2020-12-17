import { CHANGE_TOP_BANNER } from './constans'
import { IBanner, IRecommendAction } from './types'


// 轮播图
export const changeTopBannerAction = (topBanners: Array<IBanner>):IRecommendAction  => ({
  type: CHANGE_TOP_BANNER,
  payload: {
    topBanners
  }
})