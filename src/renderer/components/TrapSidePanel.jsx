import React, { Component } from 'react';
import { Select } from 'semantic-ui-react';

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
			<div style={{ display: (this.props.isOpen ? 'block' : 'none'), flex: '0.5', borderLeft: '1px solid #D4D4D5', paddingLeft: '28px' }}>
				<Select placeholder="Vyber trapku" options={traps} value={this.props.activeTrap ? this.props.activeTrap.id : null} onChange={this.props.selectTrap} style={{ width: '100%' }} />
			</div>
		);
	}
}
