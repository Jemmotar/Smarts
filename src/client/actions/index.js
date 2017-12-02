export const FILTER_SELECT = 'FILTER_SELECT';
export function selectFilter (name) {
	return {
		type: FILTER_SELECT,
		name
	};
}
