import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxCatch from 'redux-catch';
import watch from 'node-watch';

import path from 'path';
import FilterLoader from '~/src/filter/FilterLoader.js';
import TrapLoader from '~/src/trap/TrapLoader.js';
import { notifyFilterChange, notifyTrapChange, selectTrap, selectFilter, removeFilter, removeTrap, addError, clearErrors } from './actions';

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
watch(FilterLoader.source, { filter: /\.json$/ }, (e, filename) => {
	// Get only base filename
	filename = path.basename(filename, '.json');
	// Perform acction depending on event type
	switch (e) {
		case 'update':
			store.dispatch(clearErrors());
			store.dispatch(notifyFilterChange(filename));
			store.dispatch(selectFilter(store.getState().app.filter.activeFilter.id));
			store.dispatch(selectTrap(null));
			return;

		case 'remove':
			store.dispatch(removeFilter(filename));
	}
});

// Watch for changes in trap folder
watch(TrapLoader.source, { filter: /\.json$/ }, (e, filename) => {
	// Get only base filename
	filename = path.basename(filename, '.json');
	// Perform acction depending on event type
	switch (e) {
		case 'update':
			store.dispatch(clearErrors());
			store.dispatch(notifyTrapChange(filename));
			store.dispatch(selectTrap(filename));
			return;

		case 'remove':
			store.dispatch(removeTrap(filename));
	}
});

// Load all filters
for (const filename of FilterLoader.getFiles()) {
	store.dispatch(notifyFilterChange(filename));
}

// Load all traps
for (const filename of TrapLoader.getFiles()) {
	store.dispatch(notifyTrapChange(filename));
}

// Render DOM
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
