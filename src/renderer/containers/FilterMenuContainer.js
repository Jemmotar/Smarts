import { connect } from 'react-redux';
import FilterMenu from './../components/FilterMenu.jsx';
import { selectFilter, toggleTrapSidebar } from './../actions';

function mapStateToProps (state) {
	return {
		filters: state.app.filter.list,
		activeFilter: state.app.filter.activeFilter,
		evaluations: state.app.evaluation.list
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
