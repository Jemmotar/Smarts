import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import StageMenu from './../containers/StageMenuContainer.js';

export default class FilterContent extends Component {
	render () {
		return (
			<Grid columns={2} stretched style={{height: 'calc(100% - 73px)'}}>
				<Grid.Row>
					<Grid.Column style={{width: '300px'}}>
						<StageMenu />
					</Grid.Column>

					<Grid.Column style={{width: 'calc(100% - 330px)', paddingBottom: '16px', overflowY: 'auto'}}>

					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}
