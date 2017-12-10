export const FILTER_SELECT = 'FILTER_SELECT';
export function selectFilter (id) {
	return {
		type: FILTER_SELECT,
		id
	};
}

export const FILTER_LOAD = 'FILTER_LOAD';
export function loadFilter (id) {
	return {
		type: FILTER_LOAD,
		id
	};
}

export const FILTER_REMOVE = 'FILTER_REMOVE';
export function removeFilter (id) {
	return {
		type: FILTER_REMOVE,
		id
	};
}

export const STAGE_SELECT = 'STAGE_SELECT';
export function selectStage (id) {
	return {
		type: STAGE_SELECT,
		id
	};
}

export const TRAP_SELECT = 'TRAP_SELECT';
export function selectTrap (id) {
	return {
		type: TRAP_SELECT,
		id
	};
}

export const TRAP_LOAD = 'TRAP_LOAD';
export function loadTrap (id) {
	return {
		type: TRAP_LOAD,
		id
	};
}

export const TRAP_REMOVE = 'TRAP_REMOVE';
export function removeTrap (id) {
	return {
		type: TRAP_REMOVE,
		id
	};
}

export const TRAP_SIDEBAR_TOGGLE = 'TRAP_SIDEBAR_TOGGLE';
export function toggleTrapSidebar (show) {
	return {
		type: TRAP_SIDEBAR_TOGGLE,
		show
	};
}

export const ERROR_ADD = 'ERROR_ADD';
export function addError (text) {
	return {
		type: ERROR_ADD,
		text
	};
}

export const ERROR_REMOVE = 'ERROR_REMOVE';
export function removeError (id) {
	return {
		type: ERROR_REMOVE,
		id
	};
}

export const ERROR_CLEAR = 'ERROR_CLEAR';
export function clearErrors () {
	return {
		type: ERROR_CLEAR
	};
}
