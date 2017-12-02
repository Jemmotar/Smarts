export const FILTER_SELECT = 'FILTER_SELECT';
export function selectFilter (name) {
	return {
		type: FILTER_SELECT,
		name
	};
}

export const STAGE_SELECT = 'STAGE_SELECT';
export function selectStage (id) {
	return {
		type: STAGE_SELECT,
		id
	};
}
