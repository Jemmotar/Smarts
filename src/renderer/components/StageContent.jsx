import React, { Component } from 'react';
import { Segment, Message } from 'semantic-ui-react';

export default class StageContent extends Component {
	getSegmentColor (conditionIndex) {
		const { evaluation, stage } = this.props;

		if (!evaluation || !evaluation.getStageResult(stage.id) || evaluation.getStageResult(stage.id).conditions[conditionIndex] === undefined) {
			return undefined;
		}

		return evaluation.getStageResult(stage.id).conditions[conditionIndex] ? 'green' : 'red';
	}

	render () {
		const { evaluation, stage } = this.props;

		return (
			<div style={{ flex: '1', overflowY: 'auto', paddingRight: '28px', paddingBottom: '16px' }}>
				{evaluation && evaluation.getStageResult(stage.id) && evaluation.getStageResult(stage.id).errors.length > 0 &&
					<Message warning header="Evaluation failure" list={evaluation.getStageResult(stage.id).errors} />
				}

				{stage && stage.conditions.map((condition, conditionIndex) => (
					<Segment.Group key={conditionIndex}>
						<Segment>
							{condition.value}
						</Segment>
						<Segment secondary color={this.getSegmentColor(conditionIndex)}>
							{condition.logic}
						</Segment>
					</Segment.Group>
				))}
			</div>
		);
	}
}
