const initialState = {
	id: '',
	title: '',
	completed: false,
	error: false,
	loading: false
}

export const selectedTodoReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case 'FETCH_CURRENT_TODO_START': {
			return {
				...state,
				loading: true
			}
		}
		case 'LOADED_TODO': {
			const { id, title, completed } = payload
			return {
				...state,
				id,
				title,
				completed,
				loading: true
			}
		}
		case 'ERROR_TODO': {
			return {
				...state,
				error: payload,
				loading: false
			}
		}
		default: {
			return state
		}
	}
}
