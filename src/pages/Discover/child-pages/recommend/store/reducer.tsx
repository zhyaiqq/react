import * as actionTypes from './actionTypes'
import { RecommendAction } from './actionCreator'
import { IRecommendState, IBanner } from './types'

const defaultState = {
  topBanners: []
}

function reducer (state: IRecommendState = defaultState, action: RecommendAction) {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNER:
      // 这里有个坑必须返回一个新的state，不然不会监听到state变化
      return Object.assign({}, state, {topBanners: action.topBanners})
    default:
      return state
  }
}

export default reducer