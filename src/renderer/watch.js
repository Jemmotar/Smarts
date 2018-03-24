import path from 'path';
import watch from 'node-watch';
import FilterLoader from 'logic/filter/FilterLoader.js';
import TrapLoader from 'logic/trap/TrapLoader.js';

import { loadFilter, selectFilter, removeFilter } from 'ducks/filter.js';
import { loadTrap, selectTrap, removeTrap } from 'ducks/trap.js';
import { clearErrors } from 'ducks/errors.js';

const filter = {
	filter: /\.json$/
};

export default (store) => {
	watch(FilterLoader.location, filter, (e, filename) => {
		filename = path.basename(filename, '.json');
		switch (e) {
			case 'update':
				const state = store.getState();
				store.dispatch(clearErrors());
				store.dispatch(loadFilter(filename));
				store.dispatch(selectFilter(state.filter.activeFilter.id));
				store.dispatch(selectTrap(state.app.trap.active === null ? null : state.app.trap.active.id));
				return;

			case 'remove':
				store.dispatch(removeFilter(filename));
		}
	});

	watch(TrapLoader.location, filter, (e, filename) => {
		filename = path.basename(filename, '.json');
		switch (e) {
			case 'update':
				store.dispatch(clearErrors());
				store.dispatch(loadTrap(filename));
				store.dispatch(selectTrap(filename));
				return;

			case 'remove':
				store.dispatch(removeTrap(filename));
		}
	});
};
