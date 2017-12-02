import { connect } from 'react-redux';
import StageContent from './../components/StageContent.jsx';

function mapStateToProps (state) {
	return {
		stage: state.app.filter.activeStage
	};
}

export default connect(mapStateToProps)(StageContent);
