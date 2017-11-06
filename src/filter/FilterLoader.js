const Filter = require('./Filter');
const Stage = require('./Stage');

const FilterLoader = new function () {
	/* Private varaibles */
	const fs = require('fs');
	const path = require('path');
	const cache = {};

	/* Private functions */
	function read (location) {
		return JSON.parse(fs.readFileSync(location).toString());
	}

	/* Public functions */
	this.get = function (filterName) {
		const location = path.join(__dirname, '/../../filters/' + filterName + '.json');

		if (cache[location] === undefined) {
			const filterContent = read(location);

			const stages = filterContent.stages.map(
				(s) => new Stage(s.target, s.conditions, s.mode)
			);

			const filter = new Filter(
				filterContent.name,
				stages
			);

			cache[location] = filter;
		}

		return cache[location];
	};
}();

module.exports = FilterLoader;
