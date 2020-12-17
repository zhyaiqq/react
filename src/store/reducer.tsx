import { combineReducers } from 'redux';

import headerReducer from './modules/header/reducer'
import recommendReducer from './modules/recommend/reducer'

// 多个reducer合并
const rootReducer = combineReducers({
  header: headerReducer,
  recommend: recommendReducer
});

export default rootReducer;
