'use strict';

class joinHelper extends SQLBuilder.SQLHelper {
	constructor(sql, name){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-ident>') },
			Object: { syntax: this.Syntax('<value>') },
			Function: { syntax: this.Syntax('<value>') },
		});

		// set the name, otherwise all classes that inherit will named "joinHelper"
		let helperName = '$' + name;
		this.__name__ = helperName;
	}
}

module.exports = joinHelper;
