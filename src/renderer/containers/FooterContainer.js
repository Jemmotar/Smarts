import { connect } from 'react-redux';
import Footer from './../components/Footer.jsx';
import { removeError } from 'ducks/errors.js';

function mapStateToProps (state) {
	return {
		errors: state.errors.list
	};
}

function mapDispatchToProps (dispatch) {
	return {
		dismissError: (e) =>
			dispatch(removeError(parseInt(e.currentTarget.parentNode.attributes['data-index'].value)))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
