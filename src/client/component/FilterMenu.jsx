import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import FilterLoader from '~/src/filter/FilterLoader.js';

export default class FilterMenu extends Component {
	constructor (props) {
		super(props);

		const filters = FilterLoader.getNames();

		this.state = {
			activeFilter: undefined,
			filters: filters
		};

		this.handleItemClick = (e, { name }) => this.selectFilter(name);
	}

	componentDidMount () {
		const { filters } = this.state;

		// Select the first filter as default
		if (filters.length > 0) {
			this.selectFilter(filters[0]);
		}
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
			<Menu tabular attached="top">
				<Menu.Item>
					<Icon name="filter" size="large" />
				</Menu.Item>

				{filters.map((filter, index) => (
					<Menu.Item name={filter} key={index} active={activeFilter === filter} onClick={this.handleItemClick} />
				))}
			</Menu>
		);
	}
}
