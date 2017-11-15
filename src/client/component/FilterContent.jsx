import React, { Component } from 'react';
import { Grid, Menu } from 'semantic-ui-react';
import FilterLoader from '~/src/filter/FilterLoader.js';

export default class FilterContent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			activeStage: undefined
		};

		this.handleItemClick = (e, { name }) => this.selectStage(name);
	}

	selectStage (name) {
		this.setState({
			activeStage: name
		});
	}

	render () {
		const { filter } = this.props;
		const { activeStage } = this.state;

		return (
			<Grid>
				<Grid.Column width={4}>
					<Menu fluid vertical tabular>
						{filter && FilterLoader.get(filter).stages.map((stage, index) => (
							<Menu.Item key={index} name={stage.target} active={activeStage === stage.target} onClick={this.handleItemClick} />
						))}
					</Menu>
				</Grid.Column>

				<Grid.Column stretched width={12}>
					{filter && JSON.stringify(FilterLoader.get(filter))}
				</Grid.Column>
			</Grid>
		);
	}
}
