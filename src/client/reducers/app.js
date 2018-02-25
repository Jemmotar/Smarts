import FilterLoader from '../../filter/FilterLoader.js';
import TrapLoader from '../../trap/TrapLoader.js';
import { FILTER_SELECT, FILTER_LOAD, FILTER_REMOVE, STAGE_SELECT, TRAP_SELECT, TRAP_LOAD, TRAP_REMOVE, TRAP_SIDEBAR_TOGGLE, ERROR_ADD, ERROR_REMOVE, ERROR_CLEAR } from './../actions';

const initialState = {
	filter: {
		list: [],
		activeFilter: null,
		activeStage: null
	},
	trap: {
		list: [],
		active: null,
		isSidebarOpen: false
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
			const isAllreadySelected = state.filter.activeFilter === null ? false : state.filter.activeFilter.id === newFilter.id;
			const selectedStageId = isAllreadySelected ? newFilter.stages.findIndex((s) => s.id === state.filter.activeStage.id) : 0;
			return {
				...state,
				filter: {
					...state.filter,
					activeFilter: newFilter,
					activeStage: newFilter
						? newFilter.stages.length > 0
							? newFilter.stages[selectedStageId > -1 ? selectedStageId : 0]
							: null
						: null
				},
				evaluation: {
					...state.evaluation,
					active: state.evaluation.list.find((e) => e.filter.id === newFilter.id)
				}
			};

		case FILTER_LOAD:
			const loadedFilter = FilterLoader.load(action.id);
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

		case TRAP_LOAD:
			const loadedTrap = TrapLoader.load(action.id);
			if (!loadedTrap) return state;
			const isTrapInList = state.trap.list.find((t) => t.id === action.id) !== undefined;
			return {
				...state,
				trap: {
					...state.trap,
					list: isTrapInList
						? state.trap.list.map((t) => t.id === action.id ? loadedTrap : t) /* Update */
						: [ ...state.trap.list, loadedTrap ] /* Add new */
				}
			};

		case TRAP_REMOVE:
			const isTrapActive = state.trap.active && state.trap.active.id === action.id;
			return {
				...state,
				trap: {
					...state.trap,
					list: state.trap.list.filter((t) => t.id !== action.id),
					active: isTrapActive ? null : state.trap.active
				},
				evaluation: {
					...state.evaluation,
					list: isTrapActive ? [] : state.evaluation.list,
					active: isTrapActive ? null : state.evaluation.active
				}
			};

		case TRAP_SIDEBAR_TOGGLE:
			return {
				...state,
				trap: {
					...state.trap,
					isSidebarOpen: action.show === undefined
						? !state.trap.isSidebarOpen
						: action.show
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
