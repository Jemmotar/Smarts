import deepFreeze from 'deep-freeze';

/**
 * Represents result of filter evaluation against given trap
 *
 * @export
 * @class EvaluationResult
 */
export class EvaluationResult {
	/**
	 * Creates an instance of EvaluationResult.
	 * @param {any} filter A filter that is evaluated
	 * @param {any} trap A trap that is used for evaluation
	 * @memberof EvaluationResult
	 */
	constructor (filter, trap) {
		this._filter = filter;
		this._trap = trap;
		this._errors = [];
		this._results = {};
		this._passed = undefined;
		this._current = this;
	}

	/**
	 * A filter that this result is made for
	 *
	 * @readonly
	 * @memberof EvaluationResult
	 */
	get filter () {
		return this._filter;
	}

	/**
	 * A trap that this result is made for
	 *
	 * @readonly
	 * @memberof EvaluationResult
	 */
	get trap () {
		return this._trap;
	}

	/**
	 * An array of all erros collected from all stages
	 *
	 * @readonly
	 * @memberof EvaluationResult
	 */
	get errors () {
		return this._errors;
	}

	/**
	 * A object with all stage evaluation results
	 *
	 * @readonly
	 * @memberof EvaluationResult
	 */
	get results () {
		return this._results;
	}

	/**
	 * Determinantes whatever trap that belongs to this result successfully passed filter specified by this result
	 *
	 * @readonly
	 * @memberof EvaluationResult
	 */
	get passed () {
		return this._passed;
	}

	/**
	 * Start stage evalutation
	 * This sets result context
	 *
	 * @param {Stage} stage
	 * @memberof EvaluationResult
	 */
	beginStage (stage) {
		this._current = new StageEvaluationResult(stage);
	}

	/**
	 * End stage evaluation
	 * This saves the stage evaluation result
	 *
	 * @memberof EvaluationResult
	 */
	endStage () {
		this.results[this._current.stage.id] = this._current;
	}

	/**
	 * Get {StageEvaluationResult} using it's stage id
	 *
	 * @param {any} id Stage id
	 * @returns {StageEvaluationResult}
	 * @memberof EvaluationResult
	 */
	getStageResult (id) {
		return this._results[id];
	}

	/**
	 * Add condition result to current stage context
	 *
	 * @param {Boolean} result Condition result
	 * @memberof EvaluationResult
	 */
	addStageConditionResult (result) {
		this._current.conditions.push(result);
	}

	/**
	 * Set the stage evaluatuon result for current stage context
	 *
	 * @param {any} result Stage evaluatuon result
	 * @memberof EvaluationResult
	 */
	setStageResult (result) {
		this._current.passed = result;
	}

	/**
	 * Adds error message to global and local pool based on current stage context
	 *
	 * @param {any} text Error message
	 * @memberof EvaluationResult
	 */
	addError (text) {
		// Add error to global pool
		this._errors.push({
			source: this._current,
			text: text
		});

		// Add error to local pool
		this._current.errors.push(text);
	};

	/**
	 * Finalizes creation of this EvaluationResult
	 * Deep freezes the errors and results properties
	 * Evaluates local passed property
	 *
	 * @memberof EvaluationResult
	 */
	finalize () {
		this._current = null;
		this._errors = deepFreeze(this._errors);
		this._results = deepFreeze(this._results);
		this._passed = Object.values(this.results).every(
			(s) => s.passed === true
		);

		console.log(this);
	};
}

/**
 * Represents result of stage evaluation
 *
 * @export
 * @class StageEvaluationResult
 */
export class StageEvaluationResult {
	/**
	 * Creates an instance of StageEvaluationResult.
	 * @param {Stage} stage A stage instnace
	 * @memberof StageEvaluationResult
	 */
	constructor (stage) {
		this._stage = stage;
		this._conditions = [];
		this._errors = [];
		this.passed = undefined;
	}

	/**
	 * A stage that this evaluation is made for
	 *
	 * @readonly
	 * @memberof StageEvaluationResult
	 */
	get stage () {
		return this._stage;
	}

	/**
	 * An array of errors created when evaluating this stage
	 *
	 * @readonly
	 * @memberof StageEvaluationResult
	 */
	get errors () {
		return this._errors;
	}

	/**
	 * An array of condition results
	 *
	 * @readonly
	 * @memberof StageEvaluationResult
	 */
	get conditions () {
		return this._conditions;
	}
}
