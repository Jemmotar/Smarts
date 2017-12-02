export const FILTER_SELECT = 'FILTER_SELECT';
export function selectFilter (name) {
	return {
		type: FILTER_SELECT,
		name
	};
}

export const FILTER_ADD = 'FILTER_ADD';
export function addFilter (filename) {
	return {
		type: FILTER_ADD,
		filename
	};
}

export const FILTER_REMOVE = 'FILTER_REMOVE';
export function removeFilter (filename) {
	return {
		type: FILTER_REMOVE,
		filename
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
