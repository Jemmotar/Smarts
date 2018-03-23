import TrapLoader from 'logic/trap/TrapLoader.js';
import { setActiveFromFilter, evaluate } from 'ducks/evaluation.js';

// Actions
const TRAP_SELECT = 'smarts/trap/SELECT';
const TRAP_LOAD = 'smarts/trap/LOAD';
const TRAP_REMOVE = 'smarts/trap/REMOVE';
const TRAP_SIDEBAR_TOGGLE = 'smarts/trap/sidebar/TOGGLE';

// Reducer
const initialState = {
	list: [],
	active: null,
	isSidebarOpen: false
};

export default function reducer (state = initialState, action = {}) {
	switch (action.type) {
		case TRAP_SELECT:
			const newTrap = state.list.find((t) => t.id === action.id);
			if (!newTrap) {
				return state;
			}

			return {
				...state,
				active: newTrap
			};

		case TRAP_LOAD:
			const loadedTrap = TrapLoader.load(action.id);
			if (!loadedTrap) {
				return state;
			}

			const isTrapInList = state.list.find((t) => t.id === action.id) !== undefined;

			return {
				...state,
				list: isTrapInList
					? state.list.map((t) => t.id === action.id ? loadedTrap : t) /* Update */
					: [...state.list, loadedTrap] /* Add new */
			};

		case TRAP_REMOVE:
			const isTrapActive = state.active && state.active.id === action.id;
			return {
				...state,
				list: state.list.filter((t) => t.id !== action.id),
				active: isTrapActive ? null : state.active
			};

		case TRAP_SIDEBAR_TOGGLE:
			return {
				...state,
				isSidebarOpen: action.isVisible === undefined
					? !state.isSidebarOpen
					: action.isVisible
			};

		default:
			return state;
	}
}

// Action Creators

export function selectTrap (id) {
	return (dispatch, getState) => {
		dispatch({
			type: TRAP_SELECT,
			id
		});

		dispatch(evaluate());
		dispatch(setActiveFromFilter(getState().filter.activeFilter));
	};
}

export function loadTrap (id) {
	return {
		type: TRAP_LOAD,
		id
	};
}

export function removeTrap (id) {
	return (dispatch, getState) => {
		dispatch({
			type: TRAP_REMOVE,
			id
		});

		dispatch(evaluate());
		dispatch(setActiveFromFilter(getState().filter.activeFilter));
	};
}

export function toggleTrapSidebar (isVisible) {
	return {
		type: TRAP_SIDEBAR_TOGGLE,
		isVisible
	};
}
