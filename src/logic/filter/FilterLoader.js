import path from 'path';
import { remote } from 'electron';
import DirectoryJsonLoader from '../DirectoryJsonLoader.js';
import Filter from './Filter.js';
import Stage from './Stage.js';

/**
 * A singletron loader that is creating instances of {Filter} from saved files
 *
 * @class FilterLoader
 * @extends {DirectoryJsonLoader}
 */
class FilterLoader extends DirectoryJsonLoader {
	/**
	 * Creates an instance of FilterLoader.
	 * @memberof FilterLoader
	 */
	constructor () {
		super(
			process.env.NODE_ENV === 'development'
				? path.join(__dirname, '../../../data/filters')
				: path.join(remote.app.getAppPath(), 'data/filters')
		);
	}

	/**
	 * Load Filter from global filter directory
	 *
	 * @param {String} filename Name of filter to load
	 * @returns {Filter}
	 * @memberof FilterLoader
	 */
	load (filename) {
		// Load filter content using JSON loader
		const content = super.load(filename);

		// Construct stage instaces from filter content
		const stages = content.stages.map(
			(s, index) => new Stage(index, s.target, s.mode, s.conditions)
		);

		// Create filter instance from filter contnet
		const filter = new Filter(
			filename,
			content.name,
			stages
		);

		return filter;
	}
}

export default new FilterLoader();
