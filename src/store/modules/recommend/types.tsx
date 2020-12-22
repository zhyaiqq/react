import { AppAction } from '@/store'

export interface IRecommendState {
  topBanners: IBanner[],
  hotRecommendSongs: ISongItem[],
  newCDs: ISongItem[],
  topList: ISongItem[]
}

export interface IBanner {
  imageUrl: string
}

export interface ISongItem {
  name: string,
  picUrl: string,
  id: number,
  playCount: number,
  copywriter?: string,
  author?: string
}

export interface IRecommendAction extends AppAction {
  payload: {
    topBanners?: Array<IBanner>,
    hotRecommendSongs?: Array<ISongItem>,
    newCDs?: Array<ISongItem>,
    topList?: Array<ISongItem>
  }
}