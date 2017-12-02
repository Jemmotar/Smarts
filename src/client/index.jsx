import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import watch from 'node-watch';

import path from 'path';
import FilterLoader from '~/src/filter/FilterLoader.js';
import { addFilter, removeFilter } from './actions';

import reducers from './reducers';
import App from './components/App.jsx';

const store = createStore(reducers);

watch(FilterLoader.source, { filter: /\.json$/ }, (e, filename) => {
	switch (e) {
		case 'update':
			store.dispatch(addFilter(path.basename(filename, '.json')));
			return;

		case 'remove':
			store.dispatch(removeFilter(path.basename(filename, '.json')));
			return;
	}
});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
