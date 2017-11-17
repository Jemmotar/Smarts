import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import FilterLoader from '~/src/filter/FilterLoader.js';

export default class StageMenu extends Component {
	constructor (props) {
		super(props);

		this.state = {
			activeStage: 0
		};

		this.handleStageSelection = (e) => this.selectStage(parseInt(e.target.attributes['data-index'].value));
	}

	selectStage (index) {
		this.setState({
			activeStage: index
		});

		this.props.onStageSelection(index);
	}

	componentWillReceiveProps (nextProps) {
		// Reset selected stage after filter is switched
		if (this.props.filter !== nextProps.filter) {
			this.selectStage(0);
		}
	}

	render () {
		const { filter } = this.props;
		const { activeStage } = this.state;

		return (
			<Menu pointing secondary vertical>
				{filter && FilterLoader.get(filter).stages.map((stage, index) => (
					<Menu.Item key={index} data-index={index} active={activeStage === index} name={stage.target} onClick={this.handleStageSelection} />
				))}
			</Menu>
		);
	}
}
