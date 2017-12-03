import React, { Component } from 'react';
import FilterMenu from './../containers/FilterMenuContainer.js';
import Footer from './../containers/FooterContainer.js';
import FilterContent from './FilterContent.jsx';

export default class App extends Component {
	render () {
		return (
			<span>
				<FilterMenu />
				<FilterContent />
				<Footer />
			</span>
		);
	}
}
