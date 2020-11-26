import { combineReducers } from 'redux';

import { reducer as searchSongList } from '@/components/Header/store';


// 多个reducer合并
const rootReducer = combineReducers({
  searchSongList
});

export default rootReducer;