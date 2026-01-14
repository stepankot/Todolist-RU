const initialState = {
	id: '',
	title: '',
	completed: false,
	error: null,
	loading: false,
	fetchedStatus: false
}

export const selectedTodoReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case 'FETCH_CURRENT_TODO_START': {
			return {
				...state,
				loading: true,
				error: null,
				fetchedStatus: false
			}
		}
		case 'LOADED_TODO': {
			const { id, title, completed } = payload
			return {
				...state,
				id,
				title,
				completed,
				error: null,
				loading: false,
				fetchedStatus: true
			}
		}
		case 'ERROR_TODO': {
			return {
				...state,
				error: payload,
				loading: false,
				fetchedStatus: true
			}
		}
		case 'UPDATE_TODO': {
			const { id, title, completed } = payload
			return {
				...state,
				id,
				title,
				completed,
				loading: false
			}
		}
		default: {
			return state
		}
	}
}
