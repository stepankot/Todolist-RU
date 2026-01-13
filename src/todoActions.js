export const fetchTodoStart = () => ({ type: 'FETCH_TODO_START' })
export const fetchTodoSuccess = data => ({
	type: 'FETCH_TODO_SUCCESS',
	payload: data
})
export const fetchTodoFailure = error => ({
	type: 'FETCH_TODO_ERROR',
	payload: error
})

export const fetchCurrentTodoStart = () => ({
	type: 'FETCH_CURRENT_TODO_START'
})

export const loadedTodo = todo => ({
	type: 'LOADED_TODO',
	payload: todo
})

export const errorLoadingTodo = error => ({
	type: 'ERROR_TODO',
	payload: error
})
