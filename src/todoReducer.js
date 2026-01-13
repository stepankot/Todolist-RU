const initialState = {
	items: [],
	loading: false,
	error: null
}

export const todoReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case 'FETCH_TODO_START':
			return {
				...state,
				loading: true
			}
		case 'FETCH_TODO_SUCCESS':
			return {
				...state,
				items: payload,
				loading: false
			}
		case 'FETCH_TODO_ERROR':
			return {
				...state,
				loading: false,
				error: payload
			}
		default:
			return state
	}
}
