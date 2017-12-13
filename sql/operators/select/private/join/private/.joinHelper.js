'use strict';

const sqlJoin = {
	left: 'LEFT JOIN'
}
class joinHelper extends SQLBuilder.SQLHelper {
	constructor(sql, name){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<key-ident> AS <value-ident>') },
			Object: { syntax: this.Syntax('<value> AS <identifier>') },
			Function: { syntax: this.Syntax('<value> AS <key-ident>') },
		});

		// set the name, otherwise all classes that inherit will named "joinHelper"
		let helperName = '$' + name;
		this.__name__ = helperName;

		this.callee = function(on, identifier) {
			console.log(on, identifier);
			//if (this.isString(tableExpression)) {
			//	return name.toUpperCase() + ' JOIN' + this.quote(tableExpression) + (this.isString(alias) ? ' AS ' + this.quote(alias) : '')
			//}
		}
	}
}

module.exports = joinHelper;
