'use strict';

class isNull extends SQLBuilder.SQLHelper {
	constructor(sql) {
		super(sql);

		this.Types({
			Object: { syntax: this.Syntax('ISNULL(<$column>, <$onNullReturn>)', SQLBuilder.CALLEE) },
			Boolean: {
				syntax: {
					true: this.Syntax('IS NULL'),
					false: this.Syntax('IS NOT NULL')
				}
			}
		});

		// private declaration of Helpers and Operators
		this.$column = new SQLBuilder.SQLPredefined.PrimitivValueParam(sql);
		this.$onNullReturn = new SQLBuilder.SQLPredefined.PrimitivValueParam(sql);
	}
}

module.exports = {
	definition: isNull,
	description: 'Specifies the `ISNULL` function to use with SQLServer. Further it defines the `IS NULL` and `IS NOT NULL` comparision Operators used by any SQL-Dialect.',
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
