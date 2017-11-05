const FilterLoader = require('./FilterLoader');
const TrapLoader = require('../trap/TrapLoader');

FilterLoader.get('port').push(
	TrapLoader.get('portdown')
)
