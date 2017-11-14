import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import FilterLoader from '~/src/filter/FilterLoader.js';

export default class FilterContent extends Component {
	render () {
		const { filter } = this.props;
		const content = filter && JSON.stringify(FilterLoader.get(filter));

		return (
			<Segment attached="bottom">
				{content}
			</Segment>
		);
	}
}
