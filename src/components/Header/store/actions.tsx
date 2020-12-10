import * as actionTypes from './type'
import axios from '@/api/axios'

export interface searchSongAction {

}


// 搜索歌曲Action
const changeSearchSongListAction = (songList: any) => ({
  type: actionTypes.Header_SEARCH_SONG_LIST,
  songList,
});

// 搜索歌曲
export const getSearchSongListAction = (searchStr: any, limit = 6, type = 1) => {
  return (dispatch: any) => {
    axios({
      url: '/search',
      params: {
        keywords: searchStr,
        limit,
        type
      }
    }).then((res: any) => {
      if (res.code === 200)
      console.log('请求结果', res)
      dispatch(changeSearchSongListAction(res.result.songs));
    })
  }
}

// export type SearchAction = changeSearchSongListAction