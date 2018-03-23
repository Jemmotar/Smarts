import { connect } from 'react-redux';
import StageMenu from './../components/StageMenu.jsx';
import { selectStage } from 'ducks/filter.js';

function mapStateToProps (state) {
	return {
		activeFilter: state.filter.activeFilter,
		activeStage: state.filter.activeStage,
		evaluation: state.evaluation.active
	};
}

function mapDispatchToProps (dispatch) {
	return {
		selectStage: (e) =>
			dispatch(selectStage(parseInt(e.currentTarget.attributes['data-index'].value)))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StageMenu);
