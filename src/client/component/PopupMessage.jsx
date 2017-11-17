import React, { Component } from 'react';
import { Transition, Message } from 'semantic-ui-react';

const msgStyle = {
	position: 'fixed',
	width: '98%',
	left: '1%',
	bottom: '1%'
};

export default class PopupMessage extends Component {
	constructor (props) {
		super(props);

		this.state = {
			isVisible: false
		};

		this.handleDismiss = () => this.hide();
	}

	hide () {
		this.setState({
			isVisible: false
		});
	}

	show () {
		this.setState({
			isVisible: true
		});
	}

	componentDidUpdate (prevProps, prevState) {
		console.log(this.props.content);

		if (this.props.content === undefined || this.props.content === false) {
			return;
		}

		if (prevState.isVisible === false && this.state.isVisible === false) {
			this.show();
		}
	}

	render () {
		const { isVisible } = this.state;
		const { header, content } = this.props;

		return (
			<Transition animation="fade up" duration={250} visible={isVisible}>
				<Message
					negative
					style={msgStyle}
					header={header}
					list={content === false ? [] : content}
					onDismiss={this.handleDismiss}
				/>
			</Transition>
		);
	}
}
