import { connect } from 'react-redux';
import StageMenu from './../components/StageMenu.jsx';
import { selectStage } from './../actions';

function mapStateToProps (state) {
	return {
		activeFilter: state.app.filter.activeFilter,
		activeStage: state.app.filter.activeStage,
		evaluation: state.app.evaluation.active
	};
}

function mapDispatchToProps (dispatch) {
	return {
		selectStage: (e) =>
			dispatch(selectStage(parseInt(e.target.attributes['data-index'].value)))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(StageMenu);
