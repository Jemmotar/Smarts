import { connect } from 'react-redux';
import FilterMenu from './../components/FilterMenu.jsx';

import { selectFilter } from 'ducks/filter.js';
import { toggleTrapSidebar } from 'ducks/trap.js';

function mapStateToProps (state) {
	return {
		filters: state.filter.list,
		activeFilter: state.filter.activeFilter,
		evaluations: state.evaluation.list
	};
}

function mapDispatchToProps (dispatch) {
	return {
		selectFilter: (e) =>
			dispatch(selectFilter(e.currentTarget.attributes['data-id'].value)),

		toggleSidebar: () =>
			dispatch(toggleTrapSidebar())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
