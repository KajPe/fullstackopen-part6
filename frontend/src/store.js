import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import searchReducer from './reducers/searchReducer'

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
  search: searchReducer
})

const store = createStore(reducer)

export default store