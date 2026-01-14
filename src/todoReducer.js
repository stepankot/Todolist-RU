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
		case 'ADD_TODO': {
			return {
				...state,
				items: [payload, ...state.items],
				loading: false
			}
		}
		case 'DELETE_TODO': {
			return {
				...state,
				loading: false,
				items: state.items.filter(item => item.id != payload)
			}
		}
		case 'UPDATE_TODO_GLOBAL': {
			return {
				...state,
				loading: false,
				items: state.items.map(item => {
					if (item.id === payload.id) {
						return payload
					}
					return item
				})
			}
		}
		default:
			return state
	}
}
