import { connect } from 'react-redux';
import TrapSidePanel from './../components/TrapSidePanel.jsx';
import { selectTrap } from 'ducks/trap.js';

function mapStateToProps (state) {
	return {
		isOpen: state.trap.isSidebarOpen,
		traps: state.trap.list,
		activeTrap: state.trap.active,
		activeStage: state.filter.activeStage
	};
}

function mapDispatchToProps (dispatch) {
	return {
		selectTrap: (e, { value }) =>
			dispatch(selectTrap(value))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TrapSidePanel);
