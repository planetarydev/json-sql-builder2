'use strict';

const SQLOperator 	= require('./operator');
const SQLHelper 	= require('./helper');

class StringIdentifier extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-ident>') }
		});
	}
}
module.exports.StringIdentifier = StringIdentifier;

class PrimitiveValueParam extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-param>') },
			Number: { syntax: this.Syntax('<value-param>') },
			Function: { syntax: this.Syntax('<value>') },
		});
	}
}
module.exports.PrimitiveValueParam = PrimitiveValueParam;

class StringValueParam extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-param>') },
		});
	}
}
module.exports.StringValueParam = StringValueParam;

class Expression extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('<value-param>') },
			Number: { syntax: this.Syntax('<value-param>') },
		});
	}
}
module.exports.Expression = Expression;

class AcceptIfTrue extends SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Boolean: {
				syntax: {
					true: this.Syntax('-->Accepted->Return:'),
					false: this.Syntax('')
				}
			}
		});
	}
}
module.exports.AcceptIfTrue = AcceptIfTrue;
