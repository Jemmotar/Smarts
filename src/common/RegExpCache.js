export default new class RegExpCache {
	/**
	 * Create new cache for regular expressions
	 */
	constructor () {
		this._cache = {};
	}

	/**
	 * Retrieves regular expression from cache, if there is none to be found creates new one
	 * @param  {String} expression String expression
	 * @return {RegExp}            RegExp object
	 */
	get (expression) {
		if (this._cache[expression] === undefined) {
			this._cache[expression] = new RegExp(expression, 'g');
		}

		return this._cache[expression];
	}
}();
