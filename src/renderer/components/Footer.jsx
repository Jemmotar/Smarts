import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

export default class App extends Component {
	render () {
		return (
			<div style={{ position: 'absolute', bottom: '0px', width: '100%' }}>
				{this.props.errors.length > 0 && this.props.errors.map((err, index) => (
					<Message error style={{ margin: '8px' }} key={index} data-index={index} onDismiss={this.props.dismissError}>
						<Message.Header>{err.name}</Message.Header>
						<div style={{ paddingTop: '8px' }}>
							{err.message.split('\r').map((item, key) => (
								<pre key={key}>{item}<br /></pre>
							))}
						</div>
					</Message>
				))}
			</div>
		);
	}
}
