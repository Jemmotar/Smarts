import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

export default class StageContent extends Component {
	render () {
		return (
			<div>
				{this.props.stage.conditions.map((condition, conditionIndex) => (
					<Segment.Group key={conditionIndex}>
						<Segment>
							{condition.value}
						</Segment>
						<Segment secondary color={undefined}>
							{condition.logic}
						</Segment>
					</Segment.Group>
				))}
			</div>
		);
	}
}
