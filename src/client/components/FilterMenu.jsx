import React, { Component } from 'react';
import { Menu, Label, Select } from 'semantic-ui-react';

export default class FilterMenu extends Component {
	render () {
		const traps = this.props.traps.map((trap) => {
			return {
				key: trap.id,
				value: trap.id,
				text: trap.id
			};
		});

		return (
			<Menu tabular>
				{this.props.filters.map((filter, index) => (
					<Menu.Item name={filter.name} key={index} active={this.props.activeFilter.name === filter.name} onClick={this.props.selectFilter}>
						{filter.name}
						<Label circular empty color="grey" />
					</Menu.Item>
				))}

				<Menu.Menu position="right">
					<Menu.Item>
						<Select placeholder="Vyber trapku" options={traps} value={this.props.activeTrap} onChange={this.props.selectTrap} />
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
	}
}
