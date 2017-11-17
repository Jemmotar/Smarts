import EvaluationResult from './EvaluationResult.js';

const Filter = function (name, stages = []) {
	/* Public variables */
	this.name = name;
	this.stages = stages;

	/* Public functions */
	this.evaluate = (trap) => {
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
};

export default Filter;
