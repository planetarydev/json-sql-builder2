'use strict';

class values extends SQLBuilder.SQLHelper {
	constructor(sql){
		super(sql);

		this.Types({
			Array: {
				eachItemOf: {
					Primitive: { syntax: this.Syntax('<value-param>[ , ... ]') }
				}
			}
		});
	}
}

module.exports = {
	definition: values,
	description: `Specifies the \`VALUES\` clause for the \`INSERT INTO\` Statement`,
	supportedBy: {
		MySQL: 'https://dev.mysql.com/doc/refman/5.7/en/insert.html',
		MariaDB: 'https://mariadb.com/kb/en/library/insert/',
		PostgreSQL: 'https://www.postgresql.org/docs/9.5/static/sql-insert.html',
		SQLite: 'https://sqlite.org/lang_insert.html',
		Oracle: 'https://docs.oracle.com/cd/B12037_01/server.101/b10759/statements_9014.htm#i2111652',
		SQLServer: 'https://docs.microsoft.com/en-us/sql/t-sql/statements/insert-transact-sql'
	},
	examples: {
		Array: {
			eachItemOf: {
				Primitive: {
					"Basic Usage": function(sql) {
						return {
							test: function(){
								return sql.$insert({
									$table: 'people',
									$columns: ['first_name', 'last_name', 'age'],
									$values: ['John', 'Doe', 40]
								});
							},
							expectedResults: {
								sql: 'INSERT INTO people (first_name, last_name, age) VALUES ($1, $2, $3)',
								values:{
									$1: 'John',
									$2: 'Doe',
									$3: 40
								}
							}
						}
					}
				}
			}
		}
	}
}
