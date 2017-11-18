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
		this.reset = this.reset.bind(this);
	}

	reset () {
		FilterLoader.clearCache();
		TrapLoader.clearCache();

		this.selectFilter(FilterLoader.getNames()[0]);
		this.selectTrap(undefined);
	}

	selectFilter (name) {
		this.setState({
			activeFilter: name
		});
	}

	selectTrap (name) {
		if (name === undefined) {
			this.setState({
				activeTrap: undefined,
				evaluations: {}
			});
			return;
		}

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
		const { activeFilter, activeTrap, evaluations } = this.state;

		return (
			<span>
				<FilterMenu
					filter={activeFilter}
					trap={activeTrap}
					evaluations={evaluations}
					onFilterSelected={this.selectFilter}
					onTrapSelected={this.selectTrap}
					onReset={this.reset} />

				<FilterContent
					filter={activeFilter}
					evaluation={evaluations[activeFilter]} />
			</span>
		);
	}
}
