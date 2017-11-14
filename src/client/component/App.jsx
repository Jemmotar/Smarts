import React, { Component } from 'react';
import FilterMenu from './FilterMenu.jsx';
import FilterContent from './FilterContent.jsx';

export default class App extends Component {
	constructor (props) {
		super(props);

		this.state = {
			filter: undefined
		};

		this.selectFilter = this.selectFilter.bind(this);
	}

	selectFilter (name) {
		this.setState({
			filter: name
		});
	}

	render () {
		const { filter } = this.state;

		return (
			<span>
				<FilterMenu onFilterSelected={this.selectFilter} />
				<FilterContent filter={filter} />
			</span>
		);
	}
}
