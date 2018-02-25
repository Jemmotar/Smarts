import path from 'path';
import DirectoryJsonLoader from '../common/DirectoryJsonLoader.js';

class TrapLoader extends DirectoryJsonLoader {
	/**
	 * Create a trap loader
	 */
	constructor () {
		super(path.join(__dirname, '../../data/traps'));
	}

	/**
	 * Load trap from global trap directory
	 * @param  {String} filename Name of trap to load
	 * @return {Object}          Trap
	 */
	load (filename) {
		// Load trap using json loader
		const trap = super.load(filename);
		// Add id to trap properties
		// TODO: Make this internal or move saved properties to data key
		trap.id = filename;

		return trap;
	}
}

// Export class as static object
export default new TrapLoader();
