export const fetchTodoStart = () => ({ type: 'FETCH_TODO_START' })
export const fetchTodoSuccess = data => ({
	type: 'FETCH_TODO_SUCCESS',
	payload: data
})
export const fetchTodoFailure = error => ({
	type: 'FETCH_TODO_ERROR',
	payload: error
})
