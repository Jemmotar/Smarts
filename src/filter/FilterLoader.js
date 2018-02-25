import path from 'path';
import { remote } from 'electron';
import DirectoryJsonLoader from '../common/DirectoryJsonLoader.js';
import Filter from './Filter.js';
import Stage from './Stage.js';

class FilterLoader extends DirectoryJsonLoader {
	/**
	 * Create filter loader
	 */
	constructor () {
		super(
			process.env.NODE_ENV === 'development'
				? path.join(__dirname, '../../data/filters')
				: path.join(remote.app.getAppPath(), 'data/filters')
		);
	}

	/**
	 * Load filter from global filter directory
	 * @param  {String} filename Name of filter to load
	 * @return {Object}          Filter with stages
	 */
	load (filename) {
		// Load filter content using JSON loader
		const content = super.load(filename);

		// Construct stage instaces from filter content
		const stages = content.stages.map(
			(s, index) => new Stage(index, s.target, s.conditions, s.mode)
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

// Export class as static object
export default new FilterLoader();
