import { AppAction } from '@/store'

export interface IHeaderState {
  searchSongs: Array<ISongItem>
}

export interface ISongItem {
  name: string
}

export interface IHeaderAction extends AppAction {
  payload: {
    searchSongs?: Array<ISongItem>
  }
}