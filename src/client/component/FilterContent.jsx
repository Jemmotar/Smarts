import React, { Component } from 'react';
import { Grid, Item } from 'semantic-ui-react';
import StageMenu from './StageMenu.jsx';
import FilterLoader from '~/src/filter/FilterLoader.js';

export default class FilterContent extends Component {
	constructor (props) {
		super(props);

		this.state = {
			activeStageIndex: 0
		};

		this.selectStage = this.selectStage.bind(this);
	}

	selectStage (index) {
		this.setState({
			activeStageIndex: index
		});
	}

	componentWillReceiveProps (nextProps) {
		// Reset selected stage after filter is switched
		if (this.props.filter !== nextProps.filter) {
			this.selectStage(0);
		}
	}

	render () {
		const { activeStageIndex } = this.state;
		const { filter } = this.props;
		const stages = FilterLoader.get(filter).stages;

		return (
			<Grid columns={2} stretched style={{height: 'calc(100% - 43px)'}}>
				<Grid.Row>
					<Grid.Column style={{width: '240px'}}>
						<StageMenu filter={filter} activeStageIndex={activeStageIndex} onStageSelection={this.selectStage} />
					</Grid.Column>

					<Grid.Column style={{width: 'calc(100% - 270px)'}}>
						{stages.length - 1 >= activeStageIndex &&
							<Item.Group divided>
								{stages[activeStageIndex].conditions.map((c, index) => (
									<Item key={index}>
										<Item.Content verticalAlign="middle" key={index}>
											<Item.Header>{c.value}</Item.Header>
											<Item.Description>{c.logic}</Item.Description>
										</Item.Content>
									</Item>
								))}
							</Item.Group>
						}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}
