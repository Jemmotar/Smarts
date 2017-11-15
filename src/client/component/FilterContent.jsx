import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import StageMenu from './StageMenu.jsx';
import FilterLoader from '~/src/filter/FilterLoader.js';

export default class FilterContent extends Component {
	render () {
		const { filter } = this.props;

		return (
			<Grid>
				<Grid.Column width={4}>
					<StageMenu filter={filter} />
				</Grid.Column>

				<Grid.Column stretched width={12}>
					{filter && JSON.stringify(FilterLoader.get(filter))}
				</Grid.Column>
			</Grid>
		);
	}
}
