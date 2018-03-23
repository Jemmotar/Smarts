import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Select, Table } from 'semantic-ui-react';

export default class TrapSidePanel extends Component {
	render () {
		const { isOpen, activeTrap, selectTrap, activeStage } = this.props;

		const traps = this.props.traps.map((trap) => {
			return {
				key: trap.id,
				value: trap.id,
				text: trap.id
			};
		});

		return (
			<Container style={{ display: (isOpen ? 'block' : 'none'), overflowX: 'hidden', overflowY: 'auto', flex: '1', borderLeft: '1px solid #D4D4D5', paddingLeft: '28px', paddingRight: '28px' }}>
				<Select placeholder="Vyber trapku" options={traps} value={activeTrap ? activeTrap.id : null} onChange={selectTrap} style={{ width: '100%' }} />

				{activeTrap && <Table basic="very">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Attribute</Table.HeaderCell>
							<Table.HeaderCell>Value</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{activeTrap.getProperties().map((propertyName) => (
							<Table.Row key={propertyName} active={activeStage && activeStage.target === propertyName}>
								<Table.Cell>{propertyName}</Table.Cell>
								<Table.Cell>{activeTrap.getProperty(propertyName)}</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>}
			</Container>
		);
	}
}

TrapSidePanel.propTypes = {
	traps: PropTypes.array,
	isOpen: PropTypes.bool,
	activeTrap: PropTypes.object,
	activeStage: PropTypes.object,
	selectTrap: PropTypes.func
};
