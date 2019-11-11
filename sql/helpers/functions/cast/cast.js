'use strict';

class cast extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Object: { syntax: this.Syntax('CAST(<$expr> AS <$format>)') },
		});

		this.$expr = new SQLBuilder.SQLPredefined.StringValueParam(sql);
		this.$format = new SQLBuilder.SQLPredefined.StringValueParam(sql);
	}
}

module.exports = {
	definition: cast,
	description: `Specifies the \`CAST\` function.`,
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/10/functions-formatting.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions193.htm',
	},
	examples: {		
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$select({
							cast_value: { $cast: { $expr: '2017-02-31', $format: 'varchar' } }
						});
					},
					expectedResults: {
						sql: 'SELECT CAST($1 AS $2) AS cast_value',
						values: {
							$1: '2017-02-31',
							$2: 'varchar'
						}
					}
				}
			}
		},
	}
}
