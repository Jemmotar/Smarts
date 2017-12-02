import fs from 'fs';
import path from 'path';
import Filter from './Filter';
import Stage from './Stage';

const FilterLoader = new function () {
	/* Private varaibles */
	const filterDir = path.join(__dirname, '/../../filters');

	/* Private functions */
	function read (location) {
		return JSON.parse(fs.readFileSync(location).toString());
	}

	/* Public functions */
	this.get = (filterName) => {
		const location = path.join(filterDir, filterName + '.json');
		const filterContent = read(location);

		const stages = filterContent.stages.map(
			(s, index) => new Stage(index, s.target, s.conditions, s.mode)
		);

		const filter = new Filter(
			filterContent.name,
			stages
		);

		return filter;
	};

	this.getFiles = () => {
		return fs
			.readdirSync(filterDir)
			.filter((file) => file.includes('.json'))
			.map((file) => file.replace('.json', ''));
	};

	this.getAll = () => {
		return this.getFiles().map(
			(fileName) => this.get(fileName)
		);
	};
}();

export default FilterLoader;
