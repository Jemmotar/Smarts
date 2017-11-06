const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

// Keys to fill trap with
const keys = [
	'Class',
	'Event',
	'ElementClass',
	'ElementName',
	'Severity',
	'EventState',
	'ClassName',
	'Source'
];

// Pointer on the current key
let pointer = 0;

// Currenttly built trap blob
const trap = {};

function getNext () {
	if (pointer >= keys.length) {
		console.log('Done, we have all keys now!');

		const options = {
			type: 'input',
			name: 'filename',
			message: 'Enter name of save file'
		};

		inquirer.prompt(options).then((result) => {
			const location = path.join(__dirname, '../../traps', result['filename'] + '.json');
			fs.writeFileSync(location, JSON.stringify(trap, undefined, 2));
			console.log('File saved. Safe travel!');
		});
		return;
	}

	getValueFromCli().then((result) => {
		const key = Object.keys(result)[0];
		const value = result[key];

		// Save value unter it's key to the trap blob
		trap[key] = value;

		// Continue asking...
		getNext();
	});
}

function getValueFromCli () {
	return new Promise((resolve, reject) => {
		const options = {
			type: 'input',
			name: keys[pointer],
			message: `Enter value for '${keys[pointer]}':`
		};

		inquirer.prompt(options).then(
			(result) => {
				pointer++;
				resolve(result);
			}
		);
	});
}

getNext();
