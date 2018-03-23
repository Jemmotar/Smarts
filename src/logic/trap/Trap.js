import deepFreeze from 'deep-freeze';

/**
 * Represents a data model for Trap with properties
 *
 * @export
 * @class Trap
 */
export default class Trap {
	/**
	 * Creates an instance of Trap.
	 * @param {string} id Unique identificator of this trap, for example file name
	 * @param {object} properties Object with trap properties, for example JSON parsed file content
	 * @memberof Trap
	 */
	constructor (id, properties) {
		this._id = id;
		this._properties = deepFreeze(properties);
	}
	/**
	 * Return unique identificator for this trap
	 * By default, file name from witch was trap created
	 *
	 * @readonly
	 * @memberof Trap
	 */
	get id () {
		return this._id;
	}

	/**
	 * Return if this trap has property with given name
	 *
	 * @param {any} name Name of the property
	 * @returns Boolean
	 * @memberof Trap
	 */
	hasProperty (name) {
		return this._properties[name] !== undefined;
	}

	/**
	 * Return string value of given property
	 *
	 * @param {String} name Name of the property
	 * @returns String
	 * @memberof Trap
	 */
	getProperty (name) {
		if (this._properties[name] === undefined) {
			throw new Error(`Trap with id ${this._id} does not have property with name ${name}.`);
		}

		return this._properties[name];
	}

	/**
	 * Return an array of trap propertry names
	 *
	 * @returns Array
	 * @memberof Trap
	 */
	getProperties () {
		return Object.keys(this._properties);
	}
}
