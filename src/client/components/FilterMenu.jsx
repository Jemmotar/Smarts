import React, { Component } from 'react';
import { Menu, Label, Select } from 'semantic-ui-react';

export default class FilterMenu extends Component {
	getLabelColor (evaluation) {
		if (!evaluation) {
			return 'grey';
		}

		if (evaluation.errors.length > 0) {
			return 'yellow';
		}

		return evaluation.passed ? 'green' : 'red';
	}

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
					<Menu.Item name={filter.name} key={index} data-id={filter.id} active={this.props.activeFilter && this.props.activeFilter.id === filter.id} onClick={this.props.selectFilter}>
						{filter.name}
						<Label circular empty color={this.getLabelColor(this.props.evaluations.find((e) => e.filter.name === filter.name))} />
					</Menu.Item>
				))}

				<Menu.Menu position="right">
					<Menu.Item>
						<Select placeholder="Vyber trapku" options={traps} value={this.props.activeTrap ? this.props.activeTrap.id : null} onChange={this.props.selectTrap} />
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
	}
}
