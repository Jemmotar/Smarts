import FilterLoader from 'logic/filter/FilterLoader.js';
import { setActiveFromFilter, clearEvaluations, evaluate } from 'ducks/evaluation.js';

// Actions
const FILTER_SELECT = 'smarts/filter/SELECT';
const FILTER_LOAD = 'smarts/filter/LOAD';
const FILTER_REMOVE = 'smarts/filter/REMOVE';
const FILTER_STAGE_SELECT = 'smarts/filter/stage/SELECT';

// Reducer
const initialState = {
	list: [],
	activeFilter: null,
	activeStage: null
};

export default function reducer (state = initialState, action = {}) {
	switch (action.type) {
		case FILTER_SELECT:
			const newFilter = state.list.find((f) => f.id === action.id);
			const isAllreadySelected = state.activeFilter === null ? false : state.activeFilter.id === newFilter.id;
			const selectedStageId = isAllreadySelected ? newFilter.stages.findIndex((s) => s.id === state.activeStage.id) : 0;

			return {
				...state,
				activeFilter: newFilter,
				activeStage: newFilter
					? newFilter.stages.length > 0
						? newFilter.stages[selectedStageId > -1 ? selectedStageId : 0]
						: null
					: null
			};

		case FILTER_LOAD:
			const loadedFilter = FilterLoader.load(action.id);
			if (!loadedFilter) {
				return state;
			}

			const isInList = state.list.find((f) => f.id === action.id) !== undefined;
			const hasStage = loadedFilter.stages && loadedFilter.stages.length > 0;

			return {
				...state,
				list: isInList
					? state.list.map((f) => f.id === action.id ? loadedFilter : f) /* Update */
					: [ ...state.list, loadedFilter ] /* Add new */,
				activeFilter: state.activeFilter ? state.activeFilter : loadedFilter, /* If nothing is selected, select first filter */
				activeStage: state.activeStage ? state.activeStage : (hasStage ? loadedFilter.stages[0] : null) /* If nothing is selected, select first stage in first filter */
			};

		case FILTER_REMOVE:
			return {
				...state,
				list: state.list.filter((f) => f.id !== action.id)
			};

		case FILTER_STAGE_SELECT:
			return {
				...state,
				activeStage: state.activeFilter.stages.find((s) => s.id === action.id)
			};

		default:
			return state;
	}
}

// Action Creators
export function selectFilter (filterId) {
	return (dispatch, getState) => {
		dispatch({
			type: FILTER_SELECT,
			id: filterId
		});

		dispatch(setActiveFromFilter(getState().filter.activeFilter));
	};
}

export function loadFilter (id) {
	return (dispatch) => {
		dispatch({
			type: FILTER_LOAD,
			id
		});

		dispatch(clearEvaluations());
	};
}

export function removeFilter (id) {
	return {
		type: FILTER_REMOVE,
		id
	};
}

export function selectStage (id) {
	return {
		type: FILTER_STAGE_SELECT,
		id
	};
}
