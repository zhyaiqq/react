import * as actionTypes from './actionTypes'
import { IBanner } from './types'
import { 
  getTopBanners
} from '@/api/recommend'

export interface IChangeBannersAction {
  topBanners: IBanner[],
  type: actionTypes.CHANGE_TOP_BANNER
}

// 轮播图Action
export const changeTopBannerAction = (data: IBanner[]):IChangeBannersAction  => ({
  type: actionTypes.CHANGE_TOP_BANNER,
  topBanners: data
})

export type RecommendAction = IChangeBannersAction

// --------------------------------------------------------------
// 发送网络请求将结果传递给派发的Action中 (react-redux可以让该函数返回一个函数而不是返回一个对象: redux-thunk使用)
// 轮播图network request
export const getTopBannersAction = () => {
  return (dispatch: any) => {
    // 发送网络请求
    getTopBanners().then((res: any) => {
      dispatch(changeTopBannerAction(res.banners))
    })
  }
}