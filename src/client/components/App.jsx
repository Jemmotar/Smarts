import React, { Component } from 'react';
import FilterMenu from './../containers/FilterMenuContainer.js';
import FilterContent from './FilterContent.jsx';

export default class App extends Component {
	render () {
		return (
			<span>
				<FilterMenu />
				<FilterContent />
			</span>
		);
	}
}
