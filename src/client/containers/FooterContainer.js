import { connect } from 'react-redux';
import Footer from './../components/Footer.jsx';
import { removeError } from './../actions';

function mapStateToProps (state) {
	return {
		errors: state.app.error.list
	};
}

function mapDispatchToProps (dispatch) {
	return {
		dismissError: (e) =>
			dispatch(removeError(parseInt(e.currentTarget.parentNode.attributes['data-index'].value)))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
