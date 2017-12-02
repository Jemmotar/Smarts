import fs from 'fs';
import path from 'path';

const TrapLoader = new function () {
	/* Private varaibles */
	const trapDir = path.join(__dirname, '/../../traps');

	/* Private functions */
	function read (location) {
		return JSON.parse(fs.readFileSync(location).toString());
	}

	/* Public functions */
	this.get = (trapName) => {
		const location = path.join(trapDir, trapName + '.json');
		const trap = read(location);
		trap.id = trapName;
		return trap;
	};

	this.getFiles = () => {
		return fs
			.readdirSync(trapDir)
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
