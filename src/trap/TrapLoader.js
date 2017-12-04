import fs from 'fs';
import path from 'path';
import parseJson from 'parse-json';

const TrapLoader = new function () {
	/* Public varaibles */
	this.source = path.join(__dirname, '/../../data/traps');

	/* Private functions */
	function read (location) {
		return parseJson(fs.readFileSync(location).toString(), path.basename(location));
	}

	/* Public functions */
	this.get = (trapName) => {
		const location = path.join(this.source, trapName + '.json');
		const trap = read(location);
		trap.id = trapName;
		return trap;
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

export default TrapLoader;
