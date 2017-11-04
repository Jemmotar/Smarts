// Stage - Jeden krok prorovnávání vůči hodnotám jednoho atributu trapky
// Filter - Soubor zasebou jdoucích Stage

const chalk = require('chalk');

const Trap = require('./../trap/Trap.js');

const Stage = function (target) {
	/* Public varables */
	this.taget = target;
	this.rules = [];

	/* Public functions */
	this.withRule = (rule) => {
		if (!this.rules.includes(rule)) {
			this.rules.push(rule);
		}

		return this;
	};

	this.eq = (value) => this.withRule((input) => input === value);
	this.notEq = (value) => this.withRule((input) => input !== value);
	this.includes = (value) => this.withRule((input) => input.includes(value));

	this.evaluate = (trap) => {
		const trapTargetAttr = trap[this.taget];

		if (trapTargetAttr === undefined) {
			console.log('Error: This trap does not have attribute with name ' + this.taget);
			return;
		}

		const results = this.rules.map((rule) => rule(trapTargetAttr));

		console.log(chalk.cyan(results));

		return results.every((r) => r === true);
	};

	/* Private functions */

};

/*
const stage1 =
	new Stage('Source')
		.withRule((input) => input === 'SNMS-o2')
		.evaluate(Trap.get('portdown'));

const stage2 =
	new Stage('Event')
		.withRule((input) => input !== 'HighDiscardRate')
		.withRule((input) => input !== 'DownOrFlapping')
		.withRule((input) => input !== 'linkDown')
		.withRule((input) => input !== 'ConfigChange')
		.evaluate(Trap.get('portdown'));

console.log(stage2);
*/

/*
const stage1 =
	new Stage('Source')
		.eq('SNMS-o2')
		.evaluate(Trap.get('portdown'));

console.log(stage1);
*/

const stage2 =
	new Stage('Source')
		.notEq('HighDiscardRate')
		.notEq('DownOrFlapping')
		.notEq('linkDown')
		.notEq('ConfigChange')
		.evaluate(Trap.get('portdown'));

console.log(stage2);
