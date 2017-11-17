import React, { Component } from 'react';
import { Menu, Select } from 'semantic-ui-react';
import FilterLoader from '~/src/filter/FilterLoader.js';
import TrapLoader from '~/src/trap/TrapLoader.js';

export default class FilterMenu extends Component {
	constructor (props) {
		super(props);

		this.handleItemClick = (e, { name }) => this.props.onFilterSelected(name);
		this.handleTrapSelection = (e, { value }) => this.props.onTrapSelected(value);
	}

	render () {
		const activeFilter = this.props.filter;

		const traps = TrapLoader.getNames().map((trap) => {
			return {
				key: trap,
				value: trap,
				text: trap
			};
		});

		return (
			<Menu tabular>
				{FilterLoader.getNames().map((filter, index) => (
					<Menu.Item name={filter} key={index} active={activeFilter === filter} onClick={this.handleItemClick}>
						{filter}
					</Menu.Item>
				))}

				<Menu.Menu position="right">
					<Menu.Item>
						<Select placeholder="Vyber trapku" options={traps} onChange={this.handleTrapSelection} />
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
	}
}
