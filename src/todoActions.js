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

export const addTodoToState = todo => ({
	type: 'ADD_TODO',
	payload: todo
})

export const deleteTodoFromState = id => ({
	type: 'DELETE_TODO',
	payload: id
})

export const updateTodoState = todo => ({
	type: 'UPDATE_TODO',
	payload: todo
})

export const updateTodoGlobalState = todo => ({
	type: 'UPDATE_TODO_GLOBAL',
	payload: todo
})

export const setModalState = () => ({
	type: 'SET_MODAL'
})

export const setValue = value => ({
	type: 'SET_VALUE',
	payload: value
})

export const setSort = () => ({
	type: 'SET_SORT'
})

export const setSearchValue = value => ({
	type: 'SET_SEARCH',
	payload: value
})

export const setDebouncedSearch = value => ({
	type: 'SET_DEBOUNCED_SEARCH',
	payload: value
})
