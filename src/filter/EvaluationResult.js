const EvaluationResult = function (filter, trap) {
	/* Public variables */
	this.filter = filter;
	this.trap = trap;
	this.errors = [];
	this.results = {};
	this.passed = undefined;

	/* Private variables */
	let current = this;

	/* Public functions */
	this.beginStage = (stage) => {
		current = new StageEvaluationResult(stage);
	};

	this.endStage = () => {
		this.results[current.stage.target] = current;
	};

	this.getCurrentStage = () => {
		return current;
	};

	this.addError = (text) => {
		// Add error to global pool
		this.errors.push({
			source: current,
			text: text
		});

		// Add error to local pool
		current.errors.push(text);
	};

	this.finalize = () => {
		current = null;
		this.passed = Object.values(this.results).every(
			(s) => s.passed === true
		);
	};
};

const StageEvaluationResult = function (stage) {
	/* Public variables */
	this.stage = stage;
	this.conditions = [];
	this.passed = undefined;
	this.errors = [];

	/* Public functions */
	this.addConditionResult = (result) => {
		this.conditions.push(result);
	};

	this.setStageResult = (result) => {
		this.passed = result;
	};
};

export default EvaluationResult;
