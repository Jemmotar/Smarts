import fs from 'fs';
import path from 'path';
import Filter from './Filter';
import Stage from './Stage';

const FilterLoader = new function () {
	/* Private varaibles */
	const filterDir = path.join(__dirname, '/../../filters');
	const cache = {};

	/* Private functions */
	function read (location) {
		return JSON.parse(fs.readFileSync(location).toString());
	}

	/* Public functions */
	this.get = function (filterName) {
		const location = path.join(filterDir, filterName + '.json');

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

	this.getNames = function () {
		if (cache.files === undefined) {
			cache.files = fs
				.readdirSync(filterDir)
				.filter((file) => file.includes('.json'))
				.map((file) => file.replace('.json', ''));
		}

		return cache.files;
	};
}();

export default FilterLoader;
