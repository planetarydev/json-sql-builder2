'use strict';

class cmp extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: { syntax: this.Syntax('{<$value> }<$comparator>{ <$other>}', SQLBuilder.CALLEE) }
		});

		this.$comparator = new comparator(sql);
		this.$value = new SQLBuilder.SQLPredefined.PrimitivValueParam(sql);
		this.$other = new SQLBuilder.SQLPredefined.PrimitivValueParam(sql);
	}
}

class comparator extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: {
				syntax: {
					'=': this.Syntax('<value>'),
					'>': this.Syntax('<value>'),
					'<': this.Syntax('<value>'),
					'>=': this.Syntax('<value>'),
					'<=': this.Syntax('<value>'),
				}
			}
		});
	}
}

module.exports = {
	definition: cmp,
	description: 'Specifies a global comparision function as Helper.',
	supportedBy: {
		MySQL: '',
		MariaDB: '',
		PostgreSQL: '',
		SQLite: '',
		Oracle: '',
		SQLServer: ''
	},
	examples: {

	}
}
