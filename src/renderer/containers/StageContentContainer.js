import { connect } from 'react-redux';
import StageContent from './../components/StageContent.jsx';

function mapStateToProps (state) {
	return {
		stage: state.filter.activeStage,
		evaluation: state.evaluation.active
	};
}

export default connect(mapStateToProps)(StageContent);
