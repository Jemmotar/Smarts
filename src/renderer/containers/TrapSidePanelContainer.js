import { connect } from 'react-redux';
import TrapSidePanel from './../components/TrapSidePanel.jsx';
import { selectTrap } from './../actions';

function mapStateToProps (state) {
	return {
		isOpen: state.app.trap.isSidebarOpen,
		traps: state.app.trap.list,
		activeTrap: state.app.trap.active,
		activeStage: state.app.filter.activeStage
	};
}

function mapDispatchToProps (dispatch) {
	return {
		selectTrap: (e, { value }) =>
			dispatch(selectTrap(value))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TrapSidePanel);
