const FilterLoader = require('./FilterLoader');
const TrapLoader = require('../trap/TrapLoader');

FilterLoader.get('shared').push(
	TrapLoader.get('temperaturesensor')
);
