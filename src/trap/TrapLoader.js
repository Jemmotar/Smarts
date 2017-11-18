import fs from 'fs';
import path from 'path';

const TrapLoader = new function () {
	/* Private varaibles */
	const trapDir = path.join(__dirname, '/../../traps');
	let cache = {};

	/* Private functions */
	function read (location) {
		return JSON.parse(fs.readFileSync(location).toString());
	}

	/* Public functions */
	this.get = function (trapName) {
		const location = path.join(trapDir, trapName + '.json');

		if (cache[location] === undefined) {
			cache[location] = read(location);
		}

		return cache[location];
	};

	this.getNames = function () {
		if (cache.files === undefined) {
			cache.files = fs
				.readdirSync(trapDir)
				.filter((file) => file.includes('.json'))
				.map((file) => file.replace('.json', ''));
		}

		return cache.files;
	};

	this.clearCache = function () {
		cache = {};
	};
}();

export default TrapLoader;
