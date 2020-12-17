import { CHANGE_TOP_BANNER } from './constans'
import { IRecommendState, IRecommendAction } from './types'

const initialState: IRecommendState = {
  topBanners: []
}

function reducer (state: IRecommendState = initialState, action: IRecommendAction) {
  switch (action.type) {
    case CHANGE_TOP_BANNER:
      // 这里有个坑必须返回一个新的state，不然不会监听到state变化
      return {
        ...state,
        topBanners: action.payload.topBanners
      }
    default:
      return state
  }
}

export default reducer