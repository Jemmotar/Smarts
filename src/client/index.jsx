import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import watch from 'node-watch';

import path from 'path';
import FilterLoader from '~/src/filter/FilterLoader.js';
import { notifyFilterChange, selectTrap, selectFilter, removeFilter } from './actions';

import reducers from './reducers';
import App from './components/App.jsx';

const store = createStore(reducers);

watch(FilterLoader.source, { filter: /\.json$/ }, (e, filename) => {
	// Get only base filename
	filename = path.basename(filename, '.json');
	// Perform acction depending on event type
	switch (e) {
		case 'update':
			store.dispatch(notifyFilterChange(filename));
			store.dispatch(selectFilter(store.getState().app.filter.activeFilter.id));
			store.dispatch(selectTrap(null));
			return;

		case 'remove':
			store.dispatch(removeFilter(filename));
	}
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
