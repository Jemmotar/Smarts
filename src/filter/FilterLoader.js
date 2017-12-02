import fs from 'fs';
import path from 'path';
import Filter from './Filter';
import Stage from './Stage';

const FilterLoader = new function () {
	/* Public variables */
	this.source = path.join(__dirname, '/../../filters');

	/* Private functions */
	function read (location) {
		return JSON.parse(fs.readFileSync(location).toString());
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

	this.getAll = () => {
		return this.getFiles().map(
			(fileName) => this.get(fileName)
		);
	};
}();

export default FilterLoader;
