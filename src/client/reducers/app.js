import FilterLoader from '~/src/filter/FilterLoader.js';
import TrapLoader from '~/src/trap/TrapLoader.js';
import { FILTER_SELECT, FILTER_CHANGED, FILTER_REMOVE, STAGE_SELECT, TRAP_SELECT, ERROR_ADD, ERROR_REMOVE, ERROR_CLEAR } from './../actions';

const initialState = {
	filter: {
		list: [],
		activeFilter: null,
		activeStage: null
	},
	trap: {
		list: TrapLoader.getAll(),
		active: null
	},
	evaluation: {
		list: [],
		active: null
	},
	error: {
		list: []
	}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FILTER_SELECT:
			const newFilter = state.filter.list.find((f) => f.id === action.id);
			return {
				...state,
				filter: {
					...state.filter,
					activeFilter: newFilter,
					activeStage: newFilter ? (newFilter.stages.length > 0 ? newFilter.stages[0] : null) : null
				},
				evaluation: {
					...state.evaluation,
					active: state.evaluation.list.find((e) => e.filter.id === newFilter.id)
				}
			};

		case FILTER_CHANGED:
			const loadedFilter = FilterLoader.get(action.id);
			if (!loadedFilter) return state;
			const isInList = state.filter.list.find((f) => f.id === action.id) !== undefined;
			const hasStage = loadedFilter.stages && loadedFilter.stages.length > 0;
			return {
				...state,
				filter: {
					...state.filter,
					list: isInList
					? state.filter.list.map((f) => f.id === action.id ? loadedFilter : f) /* Update */
					: [ ...state.filter.list, loadedFilter ] /* Add new */,
					activeFilter: state.filter.activeFilter ? state.filter.activeFilter : loadedFilter, /* If nothing is selected, select first filter */
					activeStage: state.filter.activeStage ? state.filter.activeStage : (hasStage ? loadedFilter.stages[0] : null)  /* If nothing is selected, select first stage in first filter */
				},
				evaluation: {
					...state.evaluation,
					list: [],
					active: null
				}
			};

		case FILTER_REMOVE:
			return {
				...state,
				filter: {
					...state.filter,
					list: state.filter.list.filter((f) => f.id !== action.id)
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
			const newTrap = state.trap.list.find((t) => t.id === action.id);
			if (!newTrap) return state;
			const evaluations = state.filter.list.map((f) => f.evaluate(newTrap));
			return {
				...state,
				trap: {
					...state.trap,
					active: newTrap
				},
				evaluation: {
					...state.evaluation,
					list: evaluations,
					active: evaluations.find((e) => e.filter.name === state.filter.activeFilter.name)
				}
			};

		case ERROR_ADD:
			return {
				...state,
				error: {
					...state.error,
					list: [
						...state.error.list,
						action.text
					]
				}
			};

		case ERROR_REMOVE:
			return {
				...state,
				error: {
					...state.error,
					list: state.error.list.filter((e, index) => index !== action.id)
				}
			};

		case ERROR_CLEAR:
			return {
				...state,
				error: {
					...state.error,
					list: []
				}
			};

		default:
			return state;
	}
};
