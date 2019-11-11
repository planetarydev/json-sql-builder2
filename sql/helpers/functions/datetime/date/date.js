'use strict';

class date extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('DATE(<value-param>)') },
		});

		this.$expr = new SQLBuilder.SQLPredefined.StringValueParam(sql);
		this.$format = new SQLBuilder.SQLPredefined.StringValueParam(sql);
	}
}

module.exports = {
	definition: date,
	description: `Specifies the \`DATE\` function.`,
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
							my_timestamp: { $date: '~~foo.column' },
							$from: 'foo'
						});
					},
					expectedResults: {
						sql: 'SELECT DATE(foo.column) AS my_timestamp FROM foo',
						values: {}
					}
				}
			}
		},
	}
}
