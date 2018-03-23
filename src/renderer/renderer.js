import path from 'path';
import watch from 'node-watch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import FilterLoader from 'logic/filter/FilterLoader.js';
import TrapLoader from 'logic/trap/TrapLoader.js';

import { loadFilter, selectFilter, removeFilter } from 'ducks/filter.js';
import { loadTrap, selectTrap, removeTrap } from 'ducks/trap.js';
import { clearErrors } from 'ducks/errors.js';
import store from 'ducks';

import HmrContainer from './containers/HmrContainer.js';
import App from './components/App.jsx';

// Watch for changes in filter folder
watch(FilterLoader.location, { filter: /\.json$/ }, (e, filename) => {
	filename = path.basename(filename, '.json');

	// Perform action depending on event type
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

// Watch for changes in trap folder
watch(TrapLoader.location, { filter: /\.json$/ }, (e, filename) => {
	filename = path.basename(filename, '.json');

	// Perform action depending on event type
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

// Load all filters
for (const filename of FilterLoader.getFiles()) {
	store.dispatch(loadFilter(filename));
}

// Load all traps
for (const filename of TrapLoader.getFiles()) {
	store.dispatch(loadTrap(filename));
}

/**
 * Wrapper around ReactDOM render
 * Will reader given component wrapped in react hot reload into the root DOM element
 */
function render (Component) {
	ReactDOM.render(
		<HmrContainer>
			<Provider store={store}>
				<Component />
			</Provider>
		</HmrContainer>,
		document.getElementById('root')
	);
};

// Initial application render
render(App);

// Tweak React components in real time
// https://github.com/gaearon/react-hot-loader#getting-started
if (module.hot) {
	module.hot.accept('./components/App.jsx', () =>
		render(
			require('./components/App.jsx').default
		)
	);
}
