import deepFreeze from 'deep-freeze';

/**
 * Represents a Stage model that can perform evaluation of it's conditions
 * Stage is a collection of multiple logic conditions inside a Filter
 *
 * @export
 * @class Stage
 */
export default class Stage {
	/**
	 * Creates an instance of Stage.
	 * @param {any} id Identificator for the stage, by default it's index in the parent filter
	 * @param {any} target A property name in a trap, it's value will be used in evaluation
	 * @param {any} mode Evalutaion mode that this stage will use, 'or' by default
	 * @param {any} conditions An array of conditions, there has to be at last one and each object has to have 'logic' and 'value' properties with string values
	 * @memberof Stage
	 */
	constructor (id, target, mode, conditions) {
		this._id = id;
		this._target = target;
		this._mode = mode === undefined ? 'or' : mode;
		this._regExpCache = {};

		if (!Array.isArray(conditions)) {
			throw new Error(`Failed to create stage with id ${this._id}, value passed to conditions property was not an array.`);
		}

		if (conditions.length === 0) {
			throw new Error(`Failed to create stage with id ${this._id}, value passed to conditions property was empty array.`);
		}

		if (conditions.every(c => Object.prototype.toString.call(c['logic']) !== '[object String]' || Object.prototype.toString.call(c['value']) !== '[object String]')) {
			throw new Error(`Failed to create stage with id ${this._id}, some of it's conditions objects have 'logic' and/or 'value' properties missing or not in a string format.`);
		}

		this._conditions = deepFreeze(conditions);
	}

	/**
	 * A identificator for the stage
	 * By default it's index in the parent Filter
	 *
	 * @readonly
	 * @memberof Stage
	 */
	get id () {
		return this._id;
	}

	/**
	 * A trap property name this stage is targeting
	 * This stage's conditions will be evaluated against property value
	 *
	 * @readonly
	 * @memberof Stage
	 */
	get target () {
		return this._target;
	}

	/**
	 * Evalutaion mode that this stage is using
	 * By default logical 'or' operator is used
	 *
	 * @readonly
	 * @memberof Stage
	 */
	get mode () {
		return this._mode;
	}

	/**
	 * A deep fozen array of condition objects
	 * Every condition object has 'logic' and 'value' property with a string value
	 *
	 * @readonly
	 * @memberof Stage
	 */
	get conditions () {
		return this._conditions;
	}

	/**
	 * Fills given instance of EvaluationResult with evaluations from this stage
	 *
	 * @param {EvaluationResult} evaluation
	 * @returns {EvaluationResult}
	 * @memberof Stage
	 */
	evaluate (evaluation) {
		// Check if target trap value is valid
		if (!evaluation.trap.hasProperty(this.target)) {
			evaluation.addError(`Error while trying to evaluate ${this.target} stage, trap is missing this attribute!`);
			return;
		}

		// Evaluate each condition
		const conditionResults = this.conditions.map(
			(condition) => this._evaluateCondition(condition, evaluation.trap.getProperty(this.target), evaluation)
		);

		// Evaluate if this stage was passed
		evaluation.setStageResult(
			this._getModeResult(conditionResults, this.mode, evaluation)
		);
	}

	/**
	 * Get a result of logical operation based on mode for given evaluation
	 *
	 * @param {Array} entires An array of booleans
	 * @param {String} mode A logical mode
	 * @param {EvaluationResult} An evaluation to handle errors
	 * @returns {Boolean}
	 * @memberof Stage
	 */
	_getModeResult (entires, mode, evaluation) {
		switch (mode) {
			case 'and':
				return entires.every(
					(e) => e === true
				);

			case 'or':
				return entires.some(
					(e) => e === true
				);

			default:
				evaluation && evaluation.addError(`Error while trying to evaluate Stage mode with type ${mode}, the mode definition is missing or specified mode is not supported!`);
				return null;
		}
	}

	/**
	 * Return a new RegExp instance or allready created one from cache based on input expression string
	 *
	 * @param {String} expression An expression string to be used to create or get RegExp instance
	 * @returns {RegExp}
	 * @memberof Stage
	 */
	_getRegExp (expression) {
		if (this._regExpCache[expression] === undefined) {
			this._regExpCache[expression] = new RegExp(expression, 'g');
		}

		return this._regExpCache[expression];
	}

	/**
	 * Evaluate given condition against a target value
	 *
	 * @param {Object} condition A condition object
	 * @param {any} targetValue A value to evaluate against
	 * @param {EvaluationResult} evaluation An EvaluationResult instance to handle result or errors
	 * @returns {Boolean}
	 * @memberof Stage
	 */
	_evaluateCondition (condition, targetValue, evaluation) {
		let result = null;

		switch (condition.logic) {
			case 'equivalent':
				result = targetValue === condition.value;
				break;

			case 'not-equivalent':
				result = targetValue !== condition.value;
				break;

			case 'includes':
				result = targetValue.includes(condition.value);
				break;

			case 'not-includes':
				result = !targetValue.includes(condition.value);
				break;

			case 'starts-with':
				result = targetValue.startsWith(condition.value);
				break;

			case 'not-starts-with':
				result = !targetValue.startsWith(condition.value);
				break;

			case 'ends-with':
				result = targetValue.endsWith(condition.value);
				break;

			case 'not-ends-with':
				result = !targetValue.endsWith(condition.value);
				break;

			case 'regexp-match':
				result = this._getRegExp(condition.value).test(targetValue);
				break;

			case 'not-regexp-match':
				result = !this._getRegExp(condition.value).test(targetValue);
				break;

			default:
				evaluation && evaluation.addError(`Error while trying to evaluate condition with logic type ${condition.logic}, the logic definition is missing!`);
				return null;
		}

		evaluation && evaluation.addStageConditionResult(result);
		return result;
	}
}
