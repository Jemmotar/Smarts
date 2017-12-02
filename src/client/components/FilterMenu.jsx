import React, { Component } from 'react';
import { Menu, Label } from 'semantic-ui-react';

export default class FilterMenu extends Component {
	render () {
		return (
			<Menu tabular>
				{this.props.filters.map((filter, index) => (
					<Menu.Item name={filter.name} key={index} active={this.props.activeFilter === filter.name} onClick={this.props.selectFilter}>
						{filter.name}
						<Label circular empty color="grey" />
					</Menu.Item>
				))}
			</Menu>
		);
	}
}
