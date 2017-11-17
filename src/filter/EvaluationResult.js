const EvaluationResult = function (filter, trap) {
	/* Public variables */
	this.filter = filter;
	this.trap = trap;
	this.errors = [];
	this.result = [];

	/* Private variables */
	let currentSource = null;
	let currentBlob = null;

	/* Public functions */
	this.build = () => {
		if (currentBlob !== null) {
			this.result.push(currentBlob);
		}
	};

	this.setSource = (source) => {
		if (currentSource !== source) {
			this.build();
			currentBlob = {};
			currentSource = source;
		}
	};

	this.addError = (text) => {
		this.errors.push({
			source: currentSource,
			text
		});
	};

	this.addConditionResult = (condition, result) => {
		if (currentBlob.results === undefined) {
			currentBlob.results = [];
		}

		currentBlob.results.push({
			condition,
			result
		});
	};

	this.addStageResult = (result) => {
		currentBlob.passed = result;
	};
};

export default EvaluationResult;
