import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'
import { IHeaderState } from './modules/header/types'
import { IRecommendState } from './modules/recommend/types'

export interface AppState {
  header: IHeaderState,
  recommend: IRecommendState
}

export interface AppAction {
  type: string,
  payload: {
    [propsName: string]: any
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store