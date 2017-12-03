'use strict';

const SQLBuilder = require('./lib/builder');
global.SQLBuilder = SQLBuilder;

//const test = require('./lib/test');
const docs = require('./lib/docs');

module.exports = SQLBuilder;
