'use strict';



module.exports = function(sql) {
	sql.setLanguage('Oracle');

	sql.setQuoteChar('"');

	sql.placeholder = function() {
		return ':param' + sql._values.length;
	}

	sql.transformValueResult = function(valuesAsArray) {
		// let resultAsObj = {}
		// sql.forEach(valuesAsArray, (value, index) => {
		// 	resultAsObj['param' + index] = { val: value }
		// });
		// return resultAsObj;
	    // Oracle Nodejs client needs array of values, so no need to convert into object, so commented above code.
        return valuesAsArray;
	}
}
