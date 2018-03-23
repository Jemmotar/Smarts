// Actions
const ERROR_ADD = 'smarts/errors/ADD';
const ERROR_REMOVE = 'smarts/errors/REMOVE';
const ERROR_CLEAR = 'smarts/errors/CLEAR';

// Reducer
const initialState = {
	list: []
};

export default function reducer (state = initialState, action = {}) {
	switch (action.type) {
		case ERROR_ADD:
			return {
				...state,
				list: [
					...state.list,
					action.message
				]
			};

		case ERROR_REMOVE:
			return {
				...state,
				list: state.list.filter((e, index) => index !== action.id)
			};

		case ERROR_CLEAR:
			return {
				...state,
				list: []
			};

		default:
			return state;
	}
}

// Error handler for redux-catch
export function errorHandler (error, getState, lastAction, dispatch) {
	console.error(error);
	dispatch(addError(error));
}

// Action Creators
export function addError (message) {
	return {
		type: ERROR_ADD,
		message
	};
}

export function removeError (id) {
	return {
		type: ERROR_REMOVE,
		id
	};
}

export function clearErrors () {
	return {
		type: ERROR_CLEAR
	};
}
