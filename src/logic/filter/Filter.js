import { EvaluationResult } from './EvaluationResult.js';

/**
 * Represents a Filter model that can perform evaluation of stages
 * Filter is a named collection of stages that store moltiple logic conditions
 *
 * @export
 * @class Filter
 */
export default class Filter {
	/**
	 * Creates an instance of Filter.
	 * @param {String} id Identification of a filter, by default a name of file from which filter was created from
	 * @param {String} name A name of the filter, by default a 'name' property from file which filter was created from
	 * @param {Array} stages An array of stages that this filter will have, there has to be at last one stage
	 * @memberof Filter
	 */
	constructor (id, name, stages) {
		this._id = id;
		this._name = name;

		if (!Array.isArray(stages)) {
			throw new Error(`Failed to create filter with name ${this._name}, value passed to stages property was not an array.`);
		}

		if (stages.length === 0) {
			throw new Error(`Failed to create filter with name ${this._name}, value passed to stages property was empty array.`);
		}

		this._stages = stages;
	}

	/**
	 * Identification of a filter
	 * By default a name of file from which filter was created from
	 *
	 * @readonly
	 * @memberof Filter
	 */
	get id () {
		return this._id;
	}

	/**
	 * A name of the filter
	 * By default a 'name' property from file which filter was created from
	 *
	 * @readonly
	 * @memberof Filter
	 */
	get name () {
		return this._name;
	}

	/**
	 * An array of stages that this filter has
	 * There is allways at last one stage
	 *
	 * @readonly
	 * @memberof Filter
	 */
	get stages () {
		return this._stages;
	}

	/**
	 * Perform evaluation of all stages against given trap
	 * A result of evaluation is whenever given trap passed through this filter.
	 * This result is a complex object with error handling, see {EvaluationResult}
	 *
	 * @param {Trap} trap A trap to evaluate against
	 * @returns {EvaluationResult}
	 * @memberof Filter
	 */
	evaluate (trap) {
		const evaluation = new EvaluationResult(this, trap);

		this.stages.forEach(
			(stage) => {
				evaluation.beginStage(stage);
				stage.evaluate(evaluation);
				evaluation.endStage();
			}
		);

		evaluation.finalize();
		return evaluation;
	};
}
