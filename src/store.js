import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { todoReducer } from './todoReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
	todos: todoReducer
})

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk))
)
