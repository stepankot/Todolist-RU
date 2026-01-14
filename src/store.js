import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { thunk } from 'redux-thunk'
import { todoReducer } from './todoReducer'
import { selectedTodoReducer } from './selectedTodoReducer'
import { uiReducer } from './ui-reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducer = combineReducers({
	todos: todoReducer,
	selectedTodo: selectedTodoReducer,
	uiState: uiReducer
})

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk))
)
