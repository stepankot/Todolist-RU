import {
	fetchTodoStart,
	fetchTodoFailure,
	fetchTodoSuccess,
	fetchCurrentTodoStart,
	loadedTodo,
	errorLoadingTodo,
	addTodoToState,
	deleteTodoFromState,
	updateTodoState
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
				throw new Error(response.status)
			}
			const data = await response.json()
			dispatch(loadedTodo(data))
		} catch (error) {
			dispatch(errorLoadingTodo(error.message))
		}
	}
}

export function addTodo(todo) {
	return async dispatch => {
		dispatch(fetchTodoStart())

		try {
			const response = await fetch('http://localhost:3000/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(todo)
			})
			if (!response.ok) {
				throw new Error(response.error)
			}
			const data = await response.json()
			dispatch(addTodoToState(data))
		} catch (error) {
			dispatch(fetchTodoFailure(error.message))
		}
	}
}

export function deleteTodo(id) {
	return async dispatch => {
		dispatch(fetchCurrentTodoStart())
		try {
			const response = await fetch(`http://localhost:3000/todos/${id}`, {
				method: 'DELETE'
			})
			if (!response.ok) {
				throw new Error(response.error)
			}
			dispatch(deleteTodoFromState(id))
		} catch (error) {
			dispatch(fetchTodoFailure(error.message))
		}
	}
}

export function updateTodo(todo) {
	console.log(todo)
	return async dispatch => {
		dispatch(fetchCurrentTodoStart())
		try {
			const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(todo)
			})
			if (!response.ok) {
				throw new Error(response.error)
			}
			dispatch(updateTodoState(todo))
		} catch (error) {
			dispatch(fetchTodoFailure(error.message))
		}
	}
}
