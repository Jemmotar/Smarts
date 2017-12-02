import { connect } from 'react-redux';
import FilterMenu from './../components/FilterMenu.jsx';
import { selectFilter, selectTrap } from './../actions';

function mapStateToProps (state) {
	return {
		filters: state.app.filter.list,
		activeFilter: state.app.filter.activeFilter,
		traps: state.app.trap.list,
		activeTrap: state.app.trap.active
	};
}

function mapDispatchToProps (dispatch) {
	return {
		selectFilter: (e, { name }) =>
			dispatch(selectFilter(name)),

		selectTrap: (e, { id }) =>
			dispatch(selectTrap(id))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
