'use strict';



module.exports = function(sql) {
	sql.setLanguage('Oracle');

	sql.setQuoteChar('"');

	sql.placeholder = function() {
		return ':param' + sql._values.length;
	}

}
