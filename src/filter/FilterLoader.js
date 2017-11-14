
import Filter from './Filter';
import Stage from './Stage';

const FilterLoader = new function () {
	/* Private varaibles */
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

export default FilterLoader;
