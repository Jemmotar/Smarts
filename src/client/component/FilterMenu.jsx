import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import FilterLoader from '~/src/filter/FilterLoader.js';

export default class FilterMenu extends Component {
	constructor (props) {
		super(props);

		const filters = FilterLoader.getNames();

		this.state = {
			filters: filters,
			activeFilter: filters.length >= 0 ? filters[0] : undefined
		};

		this.handleItemClick = (e, { name }) => this.selectFilter(name);
	}

	componentDidMount () {
		// Dispatch default state to other components
		this.props.onFilterSelected(this.state.activeFilter);
	}

	selectFilter (name) {
		this.setState({
			activeFilter: name
		});

		this.props.onFilterSelected(name);
	}

	render () {
		const { activeFilter, filters } = this.state;

		return (
			<Menu tabular>
				{filters.map((filter, index) => (
					<Menu.Item name={filter} key={index} active={activeFilter === filter} onClick={this.handleItemClick} />
				))}
			</Menu>
		);
	}
}
