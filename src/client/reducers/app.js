import FilterLoader from '~/src/filter/FilterLoader.js';
import TrapLoader from '~/src/trap/TrapLoader.js';
import { FILTER_SELECT, STAGE_SELECT, TRAP_SELECT } from './../actions';

const filters = FilterLoader.getAll();

const initialState = {
	filter: {
		list: filters,
		activeFilter: filters.length > 0 ? filters[0] : null,
		activeStage: filters.length > 0 ? (filters[0].stages.length > 0 ? filters[0].stages[0] : null) : null
	},
	trap: {
		list: TrapLoader.getAll(),
		active: null
	}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FILTER_SELECT:
			const newFilter = state.filter.list.find((f) => f.name === action.name);
			return {
				...state,
				filter: {
					...state.filter,
					activeFilter: newFilter,
					activeStage: newFilter ? (newFilter.stages.length > 0 ? newFilter.stages[0] : null) : null
				}
			};

		case STAGE_SELECT:
			return {
				...state,
				filter: {
					...state.filter,
					activeStage: state.filter.activeFilter.stages.find((s) => s.id === action.id)
				}
			};

		case TRAP_SELECT:
			return {
				...state,
				trap: {
					...state.trap,
					active: action.id
				}
			};

		default:
			return state;
	}
};
