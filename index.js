'use strict';

const SQLBuilder = require('./lib/builder');
global.SQLBuilder = SQLBuilder;

const test = require('./lib/test');

module.exports = SQLBuilder;
