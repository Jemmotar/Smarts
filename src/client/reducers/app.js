import FilterLoader from '~/src/filter/FilterLoader.js';
import { FILTER_SELECT } from './../actions';

const initialState = {
	filter: {
		list: FilterLoader.getAll(),
		active: null
	}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FILTER_SELECT:
			return {
				...state,
				filter: {
					...state.filter,
					active: action.name
				}
			};

		default:
			return state;
	}
};
