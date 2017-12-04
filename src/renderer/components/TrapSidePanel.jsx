import React, { Component } from 'react';
import { Container, Select, Table } from 'semantic-ui-react';

export default class TrapSidePanel extends Component {
	render () {
		const traps = this.props.traps.map((trap) => {
			return {
				key: trap.id,
				value: trap.id,
				text: trap.id
			};
		});

		return (
			<Container style={{ display: (this.props.isOpen ? 'block' : 'none'), overflowX: 'hidden', overflowY: 'auto', flex: '1', borderLeft: '1px solid #D4D4D5', paddingLeft: '28px', paddingRight: '28px' }}>
				<Select placeholder="Vyber trapku" options={traps} value={this.props.activeTrap ? this.props.activeTrap.id : null} onChange={this.props.selectTrap} style={{ width: '100%' }} />

				{this.props.activeTrap && <Table basic="very">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Attribute</Table.HeaderCell>
							<Table.HeaderCell>Value</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{Object.keys(this.props.activeTrap).map((key, index) => (
							<Table.Row key={index} active={this.props.activeStage && this.props.activeStage.target === key}>
								<Table.Cell>{key}</Table.Cell>
								<Table.Cell>{this.props.activeTrap[key]}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>}
			</Container>
		);
	}
}
