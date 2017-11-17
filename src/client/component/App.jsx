import React, { Component } from 'react';
import FilterMenu from './FilterMenu.jsx';
import FilterContent from './FilterContent.jsx';
import FilterLoader from '~/src/filter/FilterLoader.js';
import TrapLoader from '~/src/trap/TrapLoader.js';

export default class App extends Component {
	constructor (props) {
		super(props);

		this.state = {
			activeFilter: FilterLoader.getNames()[0],
			activeTrap: undefined,
			evaluations: {}
		};

		this.selectFilter = this.selectFilter.bind(this);
		this.selectTrap = this.selectTrap.bind(this);
	}

	selectFilter (name) {
		this.setState({
			activeFilter: name
		});
	}

	selectTrap (name) {
		const evaluations = {};

		FilterLoader.getNames().forEach((filter) => {
			evaluations[filter] = FilterLoader.get(filter).evaluate(TrapLoader.get(name));
		});

		this.setState({
			activeTrap: name,
			evaluations
		});

		console.log(evaluations);
	}

	render () {
		const { activeFilter, evaluations } = this.state;

		return (
			<span>
				<FilterMenu filter={activeFilter} evaluations={evaluations} onFilterSelected={this.selectFilter} onTrapSelected={this.selectTrap} />
				<FilterContent filter={activeFilter} evaluation={evaluations[activeFilter]} />
			</span>
		);
	}
}
