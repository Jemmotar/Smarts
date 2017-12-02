import { connect } from 'react-redux';
import FilterMenu from './../components/FilterMenu.jsx';
import { selectFilter, selectTrap } from './../actions';

function mapStateToProps (state) {
	return {
		filters: state.app.filter.list,
		activeFilter: state.app.filter.activeFilter,
		traps: state.app.trap.list,
		activeTrap: state.app.trap.active,
		evaluations: state.app.evaluation.list
	};
}

function mapDispatchToProps (dispatch) {
	return {
		selectFilter: (e, { name }) =>
			dispatch(selectFilter(name)),

		selectTrap: (e, { value }) =>
			dispatch(selectTrap(value))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
