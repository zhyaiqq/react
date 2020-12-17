import { Header_SEARCH_SONG_LIST } from './constans'
import { IHeaderAction, ISongItem } from './types'
export interface searchSongAction {

}

// 搜索歌曲
export const changeSearchSongListAction = (songList: Array<ISongItem>): IHeaderAction => ({
  type: Header_SEARCH_SONG_LIST,
  payload: {
    searchSongs: songList
  }
});