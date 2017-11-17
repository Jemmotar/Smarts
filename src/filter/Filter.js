import chalk from 'chalk';

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
			stageResults.push(evaluation);
		});

		const passedFilter = stageResults.every((r) => r.result === true);
		console.log(passedFilter);

		return {
			results: stageResults,
			passed: passedFilter
		};
	};
};

export default Filter;
