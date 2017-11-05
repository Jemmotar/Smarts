// Stage - one step (line) in filter
const Stage = function (target, conditions = []) {
	/* Public varables */
	this.target = target;
	this.conditions = conditions;

	/* Public functions */
	this.evaluate = (trap) => {
		const targetValue = trap[this.target];
		
		if(targetValue === undefined) {
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
				}
			}
		);
		
		return {
			results,
			passed: results.every(
				(r) => r.result === true
			)
		};
	};

	/* Private functions */
	function evaluateCondition (condition, targetValue) {
		switch(condition.logic) {
			case 'equivalent':
				return targetValue === condition.value;
				
			case 'not-equivalent':
				return targetValue !== condition.value;
				
			default:
				console.log(`Error while trying to evaluate condition with logic type ${condition.logic}, the logic definition is missing!`);
				return null;
		}
	}

};

module.exports = Stage;
