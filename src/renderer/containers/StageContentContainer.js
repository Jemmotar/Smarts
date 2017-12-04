import { connect } from 'react-redux';
import StageContent from './../components/StageContent.jsx';

function mapStateToProps (state) {
	return {
		stage: state.app.filter.activeStage,
		evaluation: state.app.evaluation.active
	};
}

export default connect(mapStateToProps)(StageContent);
