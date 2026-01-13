import {
	fetchTodoStart,
	fetchTodoFailure,
	fetchTodoSuccess
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
