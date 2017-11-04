/*
const Example = {}

Example.tut = 5;

console.log(Example);

const Source = {
	Whirpool: 'SNMS-WP',
	Eifax: 'SNMS-EIF',
	Apple: 'SNMS-App'
};

Source.Apple = 'SNMS-App';

console.log(Source['Apple']);

for(let i = 0; i < 5; i++)
	Source['Apple' + i] = 'abc';

console.log(Source);

for(let i = 0; i < Object.keys(Source).length; i++) {
	console.log(i);
	console.log(Object.values(Source)[i]);
};
*/

const Source = {
	Whirpool: 'SNMS-WP',
	Eifax: 'SNMS-EIF',
	Apple: 'SNMS-App'
};

for (const key in Source) {
	console.log(Source[key]);
}
