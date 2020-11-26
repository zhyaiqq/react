import * as actionTypes from './type'
import { IsearchSongList } from './interface'


function reducer (state: IsearchSongList[] = [], action: any): IsearchSongList[] {
  switch (action.type) {
      case actionTypes.Header_SEARCH_SONG_LIST:
        return action.songList
    default:
      return state
  }
}

export default reducer