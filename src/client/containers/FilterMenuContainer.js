import { connect } from 'react-redux';
import FilterMenu from './../components/FilterMenu.jsx';
import { selectFilter } from './../actions';

function mapStateToProps (state) {
	return {
		filters: state.app.filter.list,
		activeFilter: state.app.filter.activeFilter
	};
}

function mapDispatchToProps (dispatch) {
	return {
		selectFilter: (e, { name }) =>
			dispatch(selectFilter(name))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
