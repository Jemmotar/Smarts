import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import FilterLoader from '~/src/filter/FilterLoader.js';

export default class StageContent extends Component {
	getSegmentColor (evaluation, stage, conditionIndex) {
		if (!evaluation || !evaluation.results[stage.target] || evaluation.results[stage.target].conditions[conditionIndex] === undefined) {
			return undefined;
		}

		console.log(evaluation.results[stage.target].conditions[conditionIndex]);

		return evaluation.results[stage.target].conditions[conditionIndex] ? 'green' : 'red';
	}

	render () {
		const { filter, activeStageIndex, evaluation } = this.props;
		const stage = FilterLoader.get(filter).stages[activeStageIndex];

		return (
			<div>
				{stage.conditions.map((condition, conditionIndex) => (
					<Segment.Group key={conditionIndex}>
						<Segment>
							{condition.value}
						</Segment>
						<Segment secondary color={this.getSegmentColor(evaluation, stage, conditionIndex)}>
							{condition.logic}
						</Segment>
					</Segment.Group>
				))}
			</div>
		);
	}
}
