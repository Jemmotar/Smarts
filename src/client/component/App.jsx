import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import FilterMenu from './FilterMenu.jsx';
import FilterContent from './FilterContent.jsx';

export default class App extends Component {
	constructor (props) {
		super(props);

		this.state = {
			filter: undefined
		};

		this.selectFilter = this.selectFilter.bind(this);
	}

	selectFilter (name) {
		this.setState({
			filter: name
		});
	}

	render () {
		const { filter } = this.state;

		return (
			<Grid>
				<Grid.Row>
					<FilterMenu onFilterSelected={this.selectFilter} />
				</Grid.Row>
				<Grid.Row>
					<FilterContent filter={filter} />
				</Grid.Row>
			</Grid>
		);
	}
}
