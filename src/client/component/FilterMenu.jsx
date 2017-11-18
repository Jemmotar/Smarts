import { remote } from 'electron';
import React, { Component } from 'react';
import { Menu, Label, Select, Button, Icon } from 'semantic-ui-react';
import FilterLoader from '~/src/filter/FilterLoader.js';
import TrapLoader from '~/src/trap/TrapLoader.js';

export default class FilterMenu extends Component {
	constructor (props) {
		super(props);

		this.handleItemClick = (e, { name }) => this.props.onFilterSelected(name);
		this.handleTrapSelection = (e, { value }) => this.props.onTrapSelected(value);
		this.handleDebugClick = (e) => remote.getCurrentWindow().toggleDevTools();

		this.handleReloadClick = () => {
			FilterLoader.clearCache();
			TrapLoader.clearCache();

			this.props.onFilterSelected(FilterLoader.getNames()[0]);
			this.props.onTrapSelected(TrapLoader.getNames()[0]);
		};
	}

	getLabelColor (evaluation) {
		if (!evaluation) {
			return 'grey';
		}

		if (evaluation.errors.length > 0) {
			return 'yellow';
		}

		return evaluation.passed ? 'green' : 'red';
	}

	render () {
		const { evaluations } = this.props;
		const activeFilter = this.props.filter;
		const activeTrap = this.props.trap;

		const traps = TrapLoader.getNames().map((trap) => {
			return {
				key: trap,
				value: trap,
				text: trap
			};
		});

		return (
			<Menu tabular>
				{FilterLoader.getNames().map((filter, index) => (
					<Menu.Item name={filter} key={index} active={activeFilter === filter} onClick={this.handleItemClick}>
						{filter}
						<Label circular empty color={this.getLabelColor(evaluations[filter])} />
					</Menu.Item>
				))}

				<Menu.Menu position="right">
					<Menu.Item>
						<Button animated="vertical" style={{marginRight: '4px'}} onClick={this.handleDebugClick}>
							<Button.Content hidden>Dev</Button.Content>
							<Button.Content visible>
								<Icon name="flask" />
							</Button.Content>
						</Button>

						<Button animated="vertical" style={{marginRight: '4px'}} onClick={this.handleReloadClick}>
							<Button.Content hidden>Reload</Button.Content>
							<Button.Content visible>
								<Icon name="refresh" />
							</Button.Content>
						</Button>

						<Select placeholder="Vyber trapku" options={traps} value={activeTrap} onChange={this.handleTrapSelection} />
					</Menu.Item>
				</Menu.Menu>
			</Menu>
		);
	}
}
