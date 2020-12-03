import { combineReducers } from 'redux';

import { reducer as searchSongList } from '@/components/Header/store';
import recommendReducer from '@/pages/Discover/child-pages/recommend/store/reducer'

// 多个reducer合并
const rootReducer = combineReducers({
  searchSongList,
  recommend: recommendReducer
});

export default rootReducer;
