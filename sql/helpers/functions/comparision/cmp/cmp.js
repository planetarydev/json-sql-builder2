'use strict';

class cmp extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: { syntax: this.Syntax('{<$value> }<$comparator>{ <$other>}', SQLBuilder.CALLEE) }
		});

		this.registerPrivateHelper('comparator');
		
		this.$value = new SQLBuilder.SQLPredefined.PrimitivValueParam(sql);
		this.$other = new SQLBuilder.SQLPredefined.PrimitivValueParam(sql);
	}
}

module.exports = {
	definition: cmp,
	description: 'Specifies a global comparision function `cmp` as Helper.',
	supportedBy: {
		MySQL: '',
		MariaDB: '',
		PostgreSQL: '',
		SQLite: '',
		Oracle: '',
		SQLServer: ''
	},
	examples: {
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.build({
							$select: {
								$from: 'people',
								$where: {
									$and: [
										sql.cmp('~~first_name', '=', 'Jane'),
										sql.cmp('~~last_name', '=', 'Doe'),
									]
								}
							}
						});
					},
					expectedResults: {
						sql: 'SELECT * FROM people WHERE first_name = $1 AND last_name = $2',
						values: {
							$1: 'Jane',
							$2: 'Doe'
						}
					}
				}
			}
		}
	}
}
