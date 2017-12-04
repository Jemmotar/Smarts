import React, { Component } from 'react';
import FilterMenu from './../containers/FilterMenuContainer.js';
import Footer from './../containers/FooterContainer.js';
import FilterContent from './FilterContent.jsx';

export default class App extends Component {
	render () {
		return (
			<div style={{ height: '100%' }}>
				<FilterMenu />
				<FilterContent />
				<Footer />
			</div>
		);
	}
}
