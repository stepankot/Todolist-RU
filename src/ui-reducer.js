const initialState = {
	onModal: false,
	value: '',
	isSortAB: false,
	searchValue: '',
	debouncedSearch: ''
}

export const uiReducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
		case 'SET_MODAL': {
			return {
				...state,
				onModal: !state.onModal
			}
		}
		case 'SET_VALUE': {
			return {
				...state,
				value: payload
			}
		}
		case 'SET_SORT': {
			return {
				...state,
				isSortAB: !state.isSortAB
			}
		}
		case 'SET_SEARCH': {
			return {
				...state,
				searchValue: payload
			}
		}
		case 'SET_DEBOUNCED_SEARCH': {
			return {
				...state,
				debouncedSearch: payload
			}
		}
		default:
			return state
	}
}
