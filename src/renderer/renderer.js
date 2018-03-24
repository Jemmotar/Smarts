import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from 'ducks';
import beginWatch from './watch.js';
import HmrContainer from './containers/HmrContainer.js';
import App from './components/App.jsx';

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

if (module && module.hot) {
	module.hot.accept('./components/App.jsx', () =>
		render(
			require('./components/App.jsx').default
		)
	);
}

beginWatch(store);
render(App);
