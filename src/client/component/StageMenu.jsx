import React, { Component } from 'react';
import { Menu, Label } from 'semantic-ui-react';
import FilterLoader from '~/src/filter/FilterLoader.js';

export default class StageMenu extends Component {
	constructor (props) {
		super(props);

		this.handleStageSelection = (e) => this.props.onStageSelection(parseInt(e.target.attributes['data-index'].value));
	}

	render () {
		const { filter, activeStageIndex } = this.props;

		return (
			<Menu pointing secondary vertical>
				{filter && FilterLoader.get(filter).stages.map((stage, index) => (
					<Menu.Item key={index} data-index={index} active={activeStageIndex === index} name={stage.target} onClick={this.handleStageSelection}>
						{stage.target}
						<Label>{stage.conditions.length}</Label>
					</Menu.Item>
				))}
			</Menu>
		);
	}
}
