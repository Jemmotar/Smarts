import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import FilterLoader from '~/src/filter/FilterLoader.js';

export default class FilterMenu extends Component {
	constructor (props) {
		super(props);

		this.handleItemClick = (e, { name }) => this.props.onFilterSelected(name);
	}

	render () {
		const activeFilter = this.props.filter;

		return (
			<Menu tabular>
				{FilterLoader.getNames().map((filter, index) => (
					<Menu.Item name={filter} key={index} active={activeFilter === filter} onClick={this.handleItemClick}>
						{filter}
					</Menu.Item>
				))}
			</Menu>
		);
	}
}
