import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import StageMenu from './StageMenu.jsx';
import StageContent from './StageContent.jsx';

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

		return (
			<Grid columns={2} stretched style={{height: 'calc(100% - 43px)'}}>
				<Grid.Row>
					<Grid.Column style={{width: '240px'}}>
						<StageMenu filter={filter} activeStageIndex={activeStageIndex} onStageSelection={this.selectStage} />
					</Grid.Column>

					<Grid.Column style={{width: 'calc(100% - 270px)'}}>
						<StageContent filter={filter} activeStageIndex={activeStageIndex} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}
