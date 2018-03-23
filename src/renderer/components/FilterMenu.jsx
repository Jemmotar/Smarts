import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Label, Checkbox } from 'semantic-ui-react';

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
						<Checkbox toggle onChange={this.props.toggleSidebar} />
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
	}
}

FilterMenu.propTypes = {
	filters: PropTypes.array,
	activeFilter: PropTypes.object,
	evaluations: PropTypes.array,
	selectFilter: PropTypes.func,
	toggleSidebar: PropTypes.func
};
