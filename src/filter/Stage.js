// Stage - one step (line) in filter
const Stage = function (target, conditions, mode) {
	/* Public variables */
	this.target = target;
	this.conditions = conditions;
	this.mode = mode === undefined ? 'or' : mode;

	/* Private variables */
	const regexCache = {};

	/* Public functions */
	this.evaluate = (evaluation) => {
		// Get trap target value
		const targetValue = evaluation.trap[this.target];

		// Check if target trap value is valid
		if (targetValue === undefined) {
			evaluation.addError(`Error while trying to evaluate trap with attribute ${this.target}, the attribute is missing!`);
			evaluation.getCurrentStage().addConditionResult('error');
			return;
		}

		// Evaluate each condition
		const conditionResults = this.conditions.map(
			(condition) => evaluateCondition(condition, targetValue, evaluation)
		);

		// Evaluate if this stage was passed
		evaluation.getCurrentStage().setStageResult(
			getModeResult(conditionResults, this.mode, evaluation)
		);
	};

	/* Private functions */
	function getModeResult (entires, mode, evaluation) {
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
				evaluation.addError(`Error while trying to evaluate mode with type ${mode}, the mode definition is missing!`);
				return null;
		}
	}

	function getRegexp (key) {
		if (regexCache[key] === undefined) {
			regexCache[key] = new RegExp(key, 'g');
		}

		return regexCache[key];
	}

	function evaluateCondition (condition, targetValue, evaluation) {
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

			case 'ends-with':
				result = targetValue.endsWith(condition.value);
				break;

			case 'regexp-match':
				result = getRegexp(condition.value).test(targetValue);
				break;

			case 'not-regexp-match':
				result = !getRegexp(condition.value).test(targetValue);
				break;

			default:
				evaluation.addError(`Error while trying to evaluate condition with logic type ${condition.logic}, the logic definition is missing!`);
				return null;
		}

		evaluation.getCurrentStage().addConditionResult(result);
		return result;
	}
};

export default Stage;
