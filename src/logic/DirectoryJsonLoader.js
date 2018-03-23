import fs from 'fs';
import path from 'path';
import parseJson from 'parse-json';

/**
 * Loader capable of loading and parsing JSON files from it's workplace location
 *
 * @export
 * @class DirectoryJsonLoader
 */
export default class DirectoryJsonLoader {
	/**
	 * Creates an instance of DirectoryJsonLoader.
	 * @param {path} location A path to directory the reader should read from
	 * @memberof DirectoryJsonLoader
	 */
	constructor (location) {
		this._location = location;

		// Make sure path to directory exists, if not create it
		if (!fs.existsSync(this._location)) {
			fs.mkdirSync(this._location);
		}
	}

	/**
	 * A path to current working directory
	 *
	 * @readonly
	 * @memberof DirectoryJsonLoader
	 */
	get location () {
		return this._location;
	}

	/**
	 * Read file at loction and try to parse it as a JSON file
	 *
	 * @param {String} location Path to file to read
	 * @returns Object
	 * @memberof DirectoryJsonLoader
	 */
	_read (location) {
		return parseJson(
			fs.readFileSync(location).toString(),
			path.basename(location)
		);
	}

	/**
	 * Return filenames of all .json files in working directory
	 *
	 * @returns {Array} Array of filenames to all .json files in working directory without .json extension
	 * @memberof DirectoryJsonLoader
	 */
	getFiles () {
		return fs
			.readdirSync(this._location)
			.filter((file) => file.includes('.json'))
			.map((file) => path.basename(file, '.json'));
	}

	/**
	 * Load JSON file from working directory
	 *
	 * @param {String} filename Name of file to load without extension
	 * @returns {Object}
	 * @memberof DirectoryJsonLoader
	 */
	load (filename) {
		return this._read(
			path.join(this._location, filename + '.json')
		);
	}
}
