// Actions
const SET_ACTIVE = 'smarts/evaluation/active/SET';
const EVALUATE = 'smarts/evaluation/active/EVALUATE';
const CLEAR = 'smarts/evaluation/CLEAR';

// Reducer
const initialState = {
	list: [],
	active: null
};

export default function reducer (state = initialState, action = {}) {
	switch (action.type) {
		case SET_ACTIVE:
			return {
				...state,
				active: state.list.find((e) => e.filter.id === action.filterId)
			};

		case EVALUATE:
			const evaluations = action.filters.map((f) => f.evaluate(action.trap));
			return {
				...state,
				list: evaluations
			};

		case CLEAR:
			return {
				...state,
				list: [],
				active: null
			};

		default:
			return state;
	}
}

// Action Creators
export function setActiveFromFilter (filter) {
	return {
		type: SET_ACTIVE,
		filterId: filter.id
	};
}

export function evaluate () {
	return (dispatch, getState) => {
		const { filter, trap } = getState();

		dispatch({
			type: EVALUATE,
			filters: filter.list,
			trap: trap.active
		});
	};
}

export function clearEvaluations () {
	return {
		type: CLEAR
	};
}
