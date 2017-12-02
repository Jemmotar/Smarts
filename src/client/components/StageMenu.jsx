import React, { Component } from 'react';
import { Menu, Label } from 'semantic-ui-react';
import FilterLoader from '~/src/filter/FilterLoader.js';

export default class StageMenu extends Component {
	constructor (props) {
		super(props);

		this.handleStageSelection = (e) => this.props.onStageSelection(parseInt(e.target.attributes['data-index'].value));
	}

	getLabelColor (evaluation, stage) {
		if (!evaluation || !evaluation.results[stage.target]) {
			return 'grey';
		}

		if (evaluation.results[stage.target].errors.length > 0) {
			return 'yellow';
		}

		return evaluation.results[stage.target].passed ? 'green' : 'red';
	}

	render () {
		const { filter, activeStageIndex, evaluation } = this.props;

		return (
			<Menu pointing secondary vertical style={{width: '100%'}}>
				{filter && FilterLoader.get(filter).stages.map((stage, index) => (
					<Menu.Item key={index} data-index={index} active={activeStageIndex === index} name={stage.target} onClick={this.handleStageSelection}>
						{stage.target}
						<Label circular empty color={this.getLabelColor(evaluation, stage)} />
						<Label size="mini" color="blue" style={{width: '32px'}}>
							{stage.mode.toUpperCase()}
						</Label>
						<Label size="mini">
							{stage.conditions.length}
						</Label>
					</Menu.Item>
				))}
			</Menu>
		);
	}
}
