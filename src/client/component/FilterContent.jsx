import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import StageMenu from './StageMenu.jsx';
import FilterLoader from '~/src/filter/FilterLoader.js';

export default class FilterContent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			activeStage: 0
		};

		this.selectStage = this.selectStage.bind(this);
	}

	selectStage (index) {
		this.setState({
			activeStage: index
		});
	}

	render () {
		const { activeStage } = this.state;
		const { filter } = this.props;

		return (
			<Grid>
				<Grid.Column width={4}>
					<StageMenu filter={filter} onStageSelection={this.selectStage} />
				</Grid.Column>

				<Grid.Column stretched width={12}>
					{filter && JSON.stringify(FilterLoader.get(filter).stages[activeStage])}
				</Grid.Column>
			</Grid>
		);
	}
}
