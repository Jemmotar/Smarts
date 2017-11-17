import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';
import FilterLoader from '~/src/filter/FilterLoader.js';

export default class StageContent extends Component {
	render () {
		const { filter, activeStageIndex } = this.props;

		return (
			<Item.Group divided>
				{FilterLoader.get(filter).stages[activeStageIndex].conditions.map((c, index) => (
					<Item key={index}>
						<Item.Content verticalAlign="middle" key={index}>
							<Item.Header>{c.value}</Item.Header>
							<Item.Description>{c.logic}</Item.Description>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		);
	}
}
