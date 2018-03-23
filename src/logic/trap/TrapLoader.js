import path from 'path';
import { remote } from 'electron';
import Trap from './Trap.js';
import DirectoryJsonLoader from '../DirectoryJsonLoader.js';

/**
 * A singletron loader that is creating instances of {Trap} from saved files
 *
 * @class TrapLoader
 * @extends {DirectoryJsonLoader}
 */
class TrapLoader extends DirectoryJsonLoader {
	/**
	 * Creates an instance of TrapLoader.
	 * @memberof TrapLoader
	 */
	constructor () {
		super(
			process.env.NODE_ENV === 'development'
				? path.join(__dirname, '../../../data/traps')
				: path.join(remote.app.getAppPath(), 'data/traps')
		);
	}

	/**
	 * Load Trap from global trap directory
	 *
	 * @param {any} filename A name of file to read
	 * @returns Trap
	 * @memberof TrapLoader
	 */
	load (filename) {
		return new Trap(
			filename,
			super.load(filename)
		);
	}
}

export default new TrapLoader();
