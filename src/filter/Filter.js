const chalk = require('chalk');

const Filter = function (name, stages = []) {
	/* Public varables */
	this.name = name;
	this.stages = stages;
	
	/* Public functions */
	this.push = (trap) => {
		const stageResults = [];
		
		console.log(`Trying to push trap thought ${chalk.yellow(this.name)} filter:`);
		this.stages.forEach((stage) => {
			// Evaluate the trap agains stage
			const evaluation = stage.evaluate(trap);
			
			// Save stage result
			stageResults.push(evaluation.result);
			
			// Log first result with stage name
			console.log(' - Stage ' + chalk[evaluation.result ? 'bgGreen' : 'bgRed'](stage.target) + ' ' + buildConditionLog(evaluation.results[0]));
			
			// Print evaluation results for each condition
			evaluation.results.forEach((conditionEvaluation, index) => {
				// Do not log the first result again
				if(index === 0) {
					return;
				}
				
				console.log(' '.repeat(10 + conditionEvaluation.attribute.target.length) + buildConditionLog(conditionEvaluation));
			});
			
			// Space between stages
			console.log('');
		});
		
		const passedThoughFilter = stageResults.every((r) => r === true);
		console.log('Trap ' + buildResultLog(passedThoughFilter));
	}
	
	/* Private functions */
	function buildConditionLog(evaluation) {
		return 'is ' + chalk[evaluation.result ? 'bgGreen' : 'bgRed'](evaluation.condition.logic + ' to "' + evaluation.condition.value + '"');
	}
	
	function buildResultLog(result) {
		return result.passed ? chalk.greenBright('PASSED') : chalk.redBright('DETAINED');
	}
};

module.exports = Filter;
