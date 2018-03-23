import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxCatch from 'redux-catch';

import filterReducer from 'ducks/filter.js';
import trapReducer from 'ducks/trap.js';
import evaluationReducer from 'ducks/evaluation.js';
import errorsReducer, { errorHandler } from 'ducks/errors.js';

const reducers = combineReducers({
	filter: filterReducer,
	trap: trapReducer,
	evaluation: evaluationReducer,
	errors: errorsReducer
});

export default createStore(
	reducers,
	applyMiddleware(
		reduxCatch(errorHandler),
		reduxThunk
	)
);

// For more about ducks see:
// https://github.com/erikras/ducks-modular-redux
