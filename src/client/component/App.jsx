import React, { Component } from 'react';
import FilterMenu from './FilterMenu.jsx';
import FilterLoader from '~/src/filter/FilterLoader.js';
import FilterContent from './FilterContent.jsx';

export default class App extends Component {
	constructor (props) {
		super(props);

		this.state = {
			activeFilter: FilterLoader.getNames()[0]
		};

		this.selectFilter = this.selectFilter.bind(this);
	}

	selectFilter (name) {
		this.setState({
			activeFilter: name
		});
	}

	render () {
		const { activeFilter } = this.state;

		return (
			<span>
				<FilterMenu filter={activeFilter} onFilterSelected={this.selectFilter} />
				<FilterContent filter={activeFilter} />
			</span>
		);
	}
}
