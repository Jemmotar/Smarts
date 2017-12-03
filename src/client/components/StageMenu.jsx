import React, { Component } from 'react';
import { Menu, Label } from 'semantic-ui-react';

export default class StageMenu extends Component {
	getLabelColor (stage) {
		const { evaluation } = this.props;

		if (!evaluation || !evaluation.getStageResult(stage.id)) {
			return 'grey';
		}

		if (evaluation.getStageResult(stage.id).errors.length > 0) {
			return 'yellow';
		}

		return evaluation.getStageResult(stage.id).passed ? 'green' : 'red';
	}

	render () {
		return (
			<Menu pointing secondary vertical style={{width: '100%'}}>
				{this.props.activeFilter && this.props.activeFilter.stages.map((stage, index) => (
					<Menu.Item key={index} data-index={index} active={this.props.activeStage.id === index} name={stage.target} onClick={this.props.selectStage}>
						{stage.target}
						<Label circular empty color={this.getLabelColor(stage)} />
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
