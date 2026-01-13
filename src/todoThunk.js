import {
	fetchTodoStart,
	fetchTodoFailure,
	fetchTodoSuccess,
	fetchCurrentTodoStart,
	loadedTodo,
	errorLoadingTodo
} from './todoActions'

export function fetchTodos() {
	return async dispatch => {
		dispatch(fetchTodoStart())

		try {
			const response = await fetch('http://localhost:3000/todos')
			if (!response.ok) {
				throw new Error(response.error)
			}
			const data = await response.json()
			dispatch(fetchTodoSuccess(data))
		} catch (error) {
			dispatch(fetchTodoFailure(error.message))
		}
	}
}

export function fetchCurrentTodo(id) {
	return async dispatch => {
		dispatch(fetchCurrentTodoStart())

		try {
			const response = await fetch(`http://localhost:3000/todos/${id}`)
			if (!response.ok) {
				throw new Error(response.error)
			}
			const data = await response.json()
			dispatch(loadedTodo(data))
		} catch (error) {
			dispatch(errorLoadingTodo(error.message))
		}
	}
}
