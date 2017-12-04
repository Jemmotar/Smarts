import fs from 'fs';
import path from 'path';
import parseJson from 'parse-json';
import Filter from './Filter';
import Stage from './Stage';

const FilterLoader = new function () {
	/* Public variables */
	this.source = path.join(__dirname, '/../../data/filters');

	/* Private functions */
	function read (location) {
		return parseJson(fs.readFileSync(location).toString(), path.basename(location));
	}

	/* Public functions */
	this.get = (filterName) => {
		const location = path.join(this.source, filterName + '.json');
		const filterContent = read(location);

		const stages = filterContent.stages.map(
			(s, index) => new Stage(index, s.target, s.conditions, s.mode)
		);

		const filter = new Filter(
			filterName,
			filterContent.name,
			stages
		);

		return filter;
	};

	this.getFiles = () => {
		return fs
			.readdirSync(this.source)
			.filter((file) => file.includes('.json'))
			.map((file) => file.replace('.json', ''));
	};
}();

export default FilterLoader;
