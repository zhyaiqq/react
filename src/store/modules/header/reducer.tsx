import { Header_SEARCH_SONG_LIST } from './constans'
import { IHeaderState, IHeaderAction } from './types'

const initialState: IHeaderState = {
  searchSongs: []
}


const reducer  = (state: IHeaderState = initialState, action: IHeaderAction) => {
  switch (action.type) {
      case Header_SEARCH_SONG_LIST:
        return  {
          ...state,
          searchSongs: action.payload.searchSongs
        }
    default:
      return state
  }
}

export default reducer