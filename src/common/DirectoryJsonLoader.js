import fs from 'fs';
import path from 'path';
import parseJson from 'parse-json';

export default class DirectoryJsonLoader {
	/**
	 * Create a JSON directory loader at given locaiton
	 * Can be used to load json files
	 * @param  {String} location Directory the reader should read from
	 */
	constructor (location) {
		this._location = location;

		// Make sure path to directory exists, if not create it
		if (!fs.existsSync(this._location)) {
			fs.mkdirSync(this._location);
		}
	}

	/**
	 * Return current working directory
	 * @return {String} Working directory path
	 */
	get location () {
		return this._location;
	}

	/**
	 * Read file at loction and try to parse it as a JSON file
	 * @param  {String} location Path to file to read
	 * @return {Object}          JSON object parsed from the file
	 */
	_read (location) {
		return parseJson(
			fs.readFileSync(location).toString(),
			path.basename(location)
		);
	}

	/**
	 * Return filenames of all .json files in working directory
	 * @return {Array} Array of filenames to all .json files in working directory without .json extension
	 */
	getFiles () {
		return fs
			.readdirSync(this._location)
			.filter((file) => file.includes('.json'))
			.map((file) => path.basename(file, '.json'));
	}

	/**
	 * Load JSON file from working directory
	 * @param  {String} filename Name of file to load without extension
	 * @return {Object}          JSON object parsed from the file
	 */
	load (filename) {
		return this._read(
			path.join(this._location, filename + '.json')
		);
	}
}
