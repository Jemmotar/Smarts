const TrapLoader = new function () {
	/* Private varaibles */
	const fs = require('fs');
	const path = require('path');
	const cache = {};

	/* Private functions */
	function read (location) {
		return JSON.parse(fs.readFileSync(location).toString());
	}

	/* Public functions */
	this.get = function (trapName) {
		const location = path.join(__dirname, '/../../traps/' + trapName + '.json');

		if (cache[location] === undefined) {
			cache[location] = read(location);
		}

		return cache[location];
	};
}();

module.exports = TrapLoader;
