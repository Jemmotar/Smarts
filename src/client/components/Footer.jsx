import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

export default class Footer extends Component {
	render () {
		const { errors, dismissError } = this.props;

		return (
			<div style={{ position: 'absolute', bottom: '0px', width: '100%' }}>
				{errors.length > 0 && errors.map((err, index) => (
					<Message error style={{ margin: '8px' }} key={index} data-index={index} onDismiss={dismissError}>
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

Footer.propTypes = {
	errors: PropTypes.array,
	dismissError: PropTypes.func
};
