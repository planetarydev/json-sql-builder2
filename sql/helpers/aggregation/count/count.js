'use strict';

class count extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			String: { syntax: this.Syntax('COUNT(<value-ident>)', SQLBuilder.CALLEE) }
		});
	}
}

module.exports = {
	definition: count,
	description: 'Specifies the aggregation function `COUNT` as Helper.',
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/group-by-functions.html#function_count',
		MariaDB: 'https://mariadb.com/kb/en/library/count/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/functions-aggregate.html',
		SQLite: 'https://sqlite.org/lang_aggfunc.html#count',
		Oracle: 'https://docs.oracle.com/cd/B19306_01/server.102/b14200/functions032.htm',
		SQLServer: 'https://docs.microsoft.com/en-US/sql/t-sql/functions/count-transact-sql'
	},
	examples: {
		String: {
			"Basic Usage": function(sql){
				return {
					test: function(){
						return sql.$select({
							total: { $count: '*' },
							$from: 'people',
							$where: {
								age: 18
							}
						});
					},
					expectedResults: {
						sql: 'SELECT COUNT(*) AS total FROM people WHERE age = $1',
						values:{
							$1: 18
						}
					}
				}
			}
		}
	}
}
