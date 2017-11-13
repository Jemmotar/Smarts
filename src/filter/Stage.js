// Stage - one step (line) in filter
const Stage = function (target, conditions, mode) {
	/* Public varables */
	this.target = target;
	this.conditions = conditions;
	this.mode = mode === null ? 'or' : mode;

	/* Private variables */
	const regexCache = {};

	/* Public functions */
	this.evaluate = (trap) => {
		const targetValue = trap[this.target];

		if (targetValue === undefined) {
			console.log(`Error while trying to evaluate trap with attribute ${this.target}, the attribute is missing!`);
			return;
		}

		const results = this.conditions.map(
			(condition) => {
				return {
					condition,
					attribute: {
						target: this.target,
						value: targetValue
					},
					result: evaluateCondition(condition, targetValue)
				};
			}
		);

		return {
			results,
			passed: evaluateUsingModeLogic(results)
		};
	};

	/* Private functions */
	function evaluateUsingModeLogic (entires) {
		switch (mode) {
			case 'and':
				return entires.every(
					(e) => e.result === true
				);

			case 'or':
				return entires.some(
					(e) => e.result === true
				);

			default:
				console.log(`Error while trying to evaluate mode with type ${this.mode}, the mode definition is missing!`);
				return null;
		}
	}

	function getRegexp (key) {
		if (regexCache[key] === undefined) {
			regexCache[key] = new RegExp(key, 'g');
		}

		return regexCache[key];
	}

	function evaluateCondition (condition, targetValue) {
		switch (condition.logic) {
			case 'equivalent':
				return targetValue === condition.value;

			case 'not-equivalent':
				return targetValue !== condition.value;

			case 'includes':
				return targetValue.includes(condition.value);

			case 'not-includes':
				return !targetValue.includes(condition.value);

			case 'starts-with':
				return targetValue.startsWith(condition.value);

			case 'ends-with':
				return targetValue.endsWith(condition.value);

			case 'regexp-match':
				return getRegexp(condition.value).test(targetValue);

			case 'not-regexp-match':
				return !getRegexp(condition.value).test(targetValue);

			default:
				console.log(`Error while trying to evaluate condition with logic type ${condition.logic}, the logic definition is missing!`);
				return null;
		}
	}
};

module.exports = Stage;
