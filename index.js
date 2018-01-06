'use strict';

const SQLBuilder = require('./lib/builder');
global.SQLBuilder = SQLBuilder;

const test = require('./lib/test');
if (test == true) { // test was successful
	console.log('Rebuild docs...');
	const docs = require('./lib/docs');
	console.log('finished.');
}

module.exports = SQLBuilder;
