import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxCatch from 'redux-catch';
import watch from 'node-watch';

import path from 'path';
import FilterLoader from '~/src/filter/FilterLoader.js';
import TrapLoader from '~/src/trap/TrapLoader.js';
import { loadFilter, loadTrap, selectTrap, selectFilter, removeFilter, removeTrap, addError, clearErrors } from './actions';

import reducers from './reducers';
import App from './components/App.jsx';

// Application store
const store = createStore(reducers, applyMiddleware(
  reduxCatch(errorHandler)
));

// Error hander for redux catch
function errorHandler (error, getState, lastAction, dispatch) {
	console.error(error);
	dispatch(addError(error));
}

// Watch for changes in filter folder
watch(FilterLoader.location, { filter: /\.json$/ }, (e, filename) => {
	// Get only base filename
	filename = path.basename(filename, '.json');
	// Perform acction depending on event type
	switch (e) {
		case 'update':
			const state = store.getState();
			store.dispatch(clearErrors());
			store.dispatch(loadFilter(filename));
			store.dispatch(selectFilter(state.app.filter.activeFilter.id));
			store.dispatch(selectTrap(state.app.trap.active === null ? null : state.app.trap.active.id));
			return;

		case 'remove':
			store.dispatch(removeFilter(filename));
	}
});

// Watch for changes in trap folder
watch(TrapLoader.location, { filter: /\.json$/ }, (e, filename) => {
	// Get only base filename
	filename = path.basename(filename, '.json');
	// Perform acction depending on event type
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

// Render DOM
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
