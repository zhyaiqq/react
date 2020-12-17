import { AppAction } from '@/store'

export interface IRecommendState {
  topBanners: IBanner[]
}

export interface IBanner {
  imageUrl: string
}

export interface IRecommendAction extends AppAction {
  payload: {
    topBanners?: Array<IBanner>
  }
}