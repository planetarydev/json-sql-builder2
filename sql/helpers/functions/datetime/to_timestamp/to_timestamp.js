'use strict';

class toTimestamp extends SQLBuilder.SQLHelper {
	constructor(sql){
		// always call the construtor of SQLHelper
		super(sql);

		// declare the possible types that can be used
		this.Types({
			// $select: { first_name: { $left: 1 } }
			// The value of $left is a Number
			// <key-ident> = "first_name"
			// <value-param> = 1
			String: { syntax: this.Syntax('TO_TIMESTAMP(<value-param>)') },

			// $select: { first_name: { $left: { $str: '~~first_name', $len: 1 } } }
			// The value of $left is an Object: $left: { $str: '~~first_name', $len: 1 }
			// <$str> = "~~first_name"
			// <$len> = 1
			Object: { syntax: this.Syntax('TO_TIMESTAMP(<$expr>, <$format>)', SQLBuilder.CALLEE) },
		});

		// define or register each Operator or Helper defined in the Syntax
		this.$expr = new SQLBuilder.SQLPredefined.StringValueParam(sql);
		this.$format = new SQLBuilder.SQLPredefined.StringValueParam(sql);
	}
}

module.exports = {
	definition: toTimestamp,
	description: `Specifies the \`TO_TIMESTAMP\` function.`,
	supportedBy: {
		PostgreSQL: 'https://www.postgresql.org/docs/10/functions-formatting.html',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions193.htm',
	},
	examples: {
		String: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$select({
							my_timestamp: { $toTimestamp: '~~foo.column' },
							$from: 'foo'
						});
					},
					expectedResults: {
						sql: 'SELECT TO_TIMESTAMP(foo.column) AS my_timestamp FROM foo',
						values: {}
					}
				}
			}
		},
		Object: {
			"Basic Usage": function(sql) {
				return {
					test: function(){
						return sql.$select({
							my_timestamp: { $toTimestamp: { $expr: '2017-02-31 30:8:00', $format: 'YYYY-MM-DD HH24:MI:SS' } }
						});
					},
					expectedResults: {
						sql: 'SELECT TO_TIMESTAMP($1, $2) AS my_timestamp',
						values: {
							$1: '2017-02-31 30:8:00',
							$2: 'YYYY-MM-DD HH24:MI:SS'
						}
					}
				}
			}
		},
	}
}
